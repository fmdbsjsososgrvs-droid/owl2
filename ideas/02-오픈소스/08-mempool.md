# Mempool (mempool.space)

- 분야: 비트코인 / 블록 익스플로러 / 셀프호스팅
- 라이선스: AGPL-3.0 (단, 상표권은 별도 — LICENSE 파일 명시)
- 저장소: https://github.com/mempool/mempool
- 별: 약 0.3만(2,849개) (2026-10-05 기준)
- 지원 플랫폼: 셀프호스팅(Umbrel, RaspiBlitz, StartOS, myNode 등 풀노드 배포판에서 원클릭, Docker, FreeBSD 등)

## 무엇을 하는가
mempool.space에서 돌아가는 비트코인 멤풀 시각화 도구 + 블록 익스플로러 + API다. 미확인 거래가 쌓인 모습, 다음 블록 예상, 적정 수수료를 한눈에 보여 준다.

## 왜 인기 있는가·기발한 점
- 수수료 시장을 블록 모양으로 시각화한 UI가 직관적이라 "지금 수수료 얼마 줘야 하지?"를 바로 답해 준다.
- 진짜 포인트는 셀프호스팅이다. 공용 익스플로러에 내 주소·트랜잭션을 검색하면 "이 IP가 이 주소에 관심 있다"는 정보가 남는다. 내 노드에 Mempool을 직접 띄우면 그 유출이 없다. 프로젝트 슬로건도 "Be your own explorer".
- 풀노드 배포판들에서 원클릭 설치를 지원한다.

## 시작하는 법
README 권장은 원클릭 설치다. Umbrel·RaspiBlitz·StartOS 같은 노드 OS의 앱 스토어에서 Mempool을 설치하면 내 노드에 붙은 익스플로러가 생긴다. 직접 구성은 저장소의 `docker/` 디렉터리 안내 참고.

## 아쉬운 점·대안
- 풀노드(및 인덱서)가 필요하므로 디스크와 동기화 시간이 든다.
- 로고·명칭 등 상표는 AGPL 라이선스에 포함되지 않는다. 포크해서 쓸 때 주의.
- 대안: BTC RPC Explorer, Electrs/Fulcrum 기반 지갑 연동.

## 출처
- https://github.com/mempool/mempool
- https://github.com/mempool/mempool/blob/master/LICENSE
- https://api.github.com/repos/mempool/mempool (최근 푸시 2026-10-04, 최신 릴리스 v3.3.1 / 2026-04-21)
- https://mempool.space
- 확인일: 2026-10-05
