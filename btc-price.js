/**
 * btc-price.js — Shared BTC price fetcher with source fallback + session cache.
 *
 * Exposes window.BtcPrice:
 *   - fetchKrw()  → Promise<{price, source, cached}>  KRW price (Upbit → Bithumb)
 *   - fetchUsd()  → Promise<{price, source, cached}>  USD price (Coinbase → Kraken)
 *   - fetchBoth() → Promise<{krw, usd}> — either may be null if all sources failed
 *   - clearCache() — drops the session cache
 *
 * Cache: 30 s TTL in sessionStorage. First success of the current window wins.
 * Per-source timeout: 3.5 s. Fail-fast onto the next source.
 */
(function (root) {
  'use strict';

  var CACHE_TTL = 30 * 1000;        // 30 s
  var FETCH_TIMEOUT = 3500;         // 3.5 s per source
  var KEY_KRW = 'btcprice.krw';
  var KEY_USD = 'btcprice.usd';

  // -------- sources --------
  var KRW_SOURCES = [
    {
      name: 'Upbit',
      url:  'https://api.upbit.com/v1/ticker?markets=KRW-BTC',
      parse: function (d) { return d && d[0] && d[0].trade_price; }
    },
    {
      name: 'Bithumb',
      url:  'https://api.bithumb.com/public/ticker/BTC_KRW',
      parse: function (d) {
        return d && d.data && parseFloat(d.data.closing_price);
      }
    }
  ];

  var USD_SOURCES = [
    {
      name: 'Coinbase',
      url:  'https://api.coinbase.com/v2/prices/BTC-USD/spot',
      parse: function (d) { return d && d.data && parseFloat(d.data.amount); }
    },
    {
      name: 'Kraken',
      url:  'https://api.kraken.com/0/public/Ticker?pair=XBTUSD',
      parse: function (d) {
        if (!d || !d.result) return null;
        var keys = Object.keys(d.result);
        if (!keys.length) return null;
        var k = d.result[keys[0]];
        return k && k.c && parseFloat(k.c[0]);
      }
    }
  ];

  // -------- cache --------
  function cacheGet(key) {
    try {
      var raw = sessionStorage.getItem(key);
      if (!raw) return null;
      var p = JSON.parse(raw);
      if (!p || typeof p.ts !== 'number') return null;
      if (Date.now() - p.ts > CACHE_TTL) return null;
      return p;
    } catch (e) { return null; }
  }
  function cacheSet(key, data) {
    try {
      sessionStorage.setItem(key, JSON.stringify({
        price: data.price,
        source: data.source,
        ts: Date.now()
      }));
    } catch (e) { /* quota exceeded, etc. — just ignore */ }
  }

  // -------- fetch helper --------
  function fetchJsonWithTimeout(url, timeoutMs) {
    return new Promise(function (resolve, reject) {
      var done = false;
      var timer = setTimeout(function () {
        if (done) return;
        done = true;
        reject(new Error('timeout'));
      }, timeoutMs);

      fetch(url, { cache: 'no-store' })
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.json();
        })
        .then(function (json) {
          if (done) return;
          done = true;
          clearTimeout(timer);
          resolve(json);
        })
        .catch(function (err) {
          if (done) return;
          done = true;
          clearTimeout(timer);
          reject(err);
        });
    });
  }

  // -------- core: try sources in order --------
  async function fromSources(sources, cacheKey) {
    var cached = cacheGet(cacheKey);
    if (cached) {
      return { price: cached.price, source: cached.source, cached: true };
    }
    var errors = [];
    for (var i = 0; i < sources.length; i++) {
      var s = sources[i];
      try {
        var json = await fetchJsonWithTimeout(s.url, FETCH_TIMEOUT);
        var price = s.parse(json);
        if (typeof price === 'number' && isFinite(price) && price > 0) {
          cacheSet(cacheKey, { price: price, source: s.name });
          return { price: price, source: s.name, cached: false };
        }
        errors.push(s.name + ': bad payload');
      } catch (e) {
        errors.push(s.name + ': ' + (e && e.message ? e.message : 'error'));
      }
    }
    var err = new Error('All sources failed — ' + errors.join(' | '));
    err.sourceErrors = errors;
    throw err;
  }

  // -------- public api --------
  root.BtcPrice = {
    fetchKrw: function () { return fromSources(KRW_SOURCES, KEY_KRW); },
    fetchUsd: function () { return fromSources(USD_SOURCES, KEY_USD); },
    fetchBoth: async function () {
      var settled = await Promise.allSettled([
        root.BtcPrice.fetchKrw(),
        root.BtcPrice.fetchUsd()
      ]);
      return {
        krw: settled[0].status === 'fulfilled' ? settled[0].value : null,
        usd: settled[1].status === 'fulfilled' ? settled[1].value : null
      };
    },
    clearCache: function () {
      try {
        sessionStorage.removeItem(KEY_KRW);
        sessionStorage.removeItem(KEY_USD);
      } catch (e) {}
    }
  };
})(window);
