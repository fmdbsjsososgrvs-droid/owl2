# Sparrow Wallet

- 분야: 비트코인 / 셀프 커스터디 지갑
- 라이선스: Apache-2.0
- 저장소: https://github.com/sparrowwallet/sparrow
- 별: 약 0.2만(2,154개) (2026-10-05 기준)
- 지원 플랫폼: 데스크톱(Windows, macOS, Linux)

## 무엇을 하는가
보안과 프라이버시에 집중한 데스크톱 비트코인 지갑이다. 대부분의 하드웨어 지갑을 지원하고 PSBT 같은 공통 표준 위에 만들어져서, "키는 하드웨어 지갑에, 거래 구성·확인은 Sparrow에서"라는 셀프 커스터디 흐름의 허브 역할을 한다.

## 왜 인기 있는가·기발한 점
- 하드웨어 지갑을 USB와 에어갭(QR·파일) 방식 모두로 붙일 수 있고, 싱글시그·멀티시그를 모두 제대로 지원한다.
- Tor 내장. 내 Bitcoin Core 노드, 개인 Electrum 서버, 공용 서버 중 골라 연결할 수 있어서 프라이버시 수준을 내가 정한다.
- 트랜잭션 구조를 투명하게 보여 줘서 UTXO 하나하나를 의식하며 보내게 만든다.
- v1.5.0부터 릴리스 바이너리가 재현 가능 빌드(reproducible build)다. 받은 바이너리가 소스와 같은지 검증할 수 있다는 뜻.

## 시작하는 법
https://sparrowwallet.com 또는 GitHub 릴리스에서 설치 파일을 받는다. 받은 뒤 서명 검증을 먼저 하고, 서버 연결 → 하드웨어 지갑으로 새 지갑 생성 순서로 진행.

## 아쉬운 점·대안
- 모바일 앱이 없다. 데스크톱 전용.
- 기능이 많아 비트코인 입문자에겐 용어 장벽이 있다.
- 별 숫자는 작지만 비트코인 셀프 커스터디 쪽에서는 사실상 표준급 도구다. 최신 릴리스 2.5.5(2026-09-17).
- 대안: Electrum, Nunchuk(멀티시그), Specter Desktop.

## 출처
- https://github.com/sparrowwallet/sparrow
- https://api.github.com/repos/sparrowwallet/sparrow
- https://sparrowwallet.com/
- 확인일: 2026-10-05
