# BTCPay Server

- 분야: 비트코인 / 결제 / 셀프호스팅
- 라이선스: MIT
- 저장소: https://github.com/btcpayserver/btcpayserver
- 별: 약 0.8만(7,785개) (2026-10-05 기준)
- 지원 플랫폼: 셀프호스팅 서버(Docker 배포 등)

## 무엇을 하는가
무료·오픈소스·셀프호스팅 비트코인 결제 처리기다. 가게나 온라인 쇼핑몰이 중개업체 없이, 수수료 없이 비트코인을 직접 받게 해 준다. 인보이스 발행, 결제 확인, 상점 관리를 내 서버에서 한다.

## 왜 인기 있는가·기발한 점
- 결제 대행사가 고객 돈을 잠깐 쥐고 있는 구조가 아니다. 결제가 바로 내 지갑으로 들어온다(셀프 커스터디 결제).
- Greenfield API와 플러그인 구조가 있어서 쇼핑몰·서비스에 붙이기 좋다.
- 개발이 아주 활발하다(최신 릴리스 v2.4.4, 2026-09-07). 메인넷 데모도 공개돼 있다.

## 시작하는 법
공식 문서(https://docs.btcpayserver.org/)의 배포 가이드를 따른다. VPS나 홈서버에 Docker 기반으로 설치하는 방법이 일반적이다. 먼저 https://mainnet.demo.btcpayserver.org/ 에서 둘러볼 수 있다.

## 아쉬운 점·대안
- 서버 운영(노드 동기화, 디스크 용량, 업데이트)이 필요해서 "깔고 끝"은 아니다.
- 비트코인 결제 자체를 받을 일이 없다면 쓸 일이 없는 도구.
- 대안: 결제 기능이 포함된 Lightning 노드 소프트웨어, 수탁형 결제 서비스(편하지만 셀프 커스터디 아님).

## 출처
- https://github.com/btcpayserver/btcpayserver
- https://api.github.com/repos/btcpayserver/btcpayserver
- https://btcpayserver.org/ / https://docs.btcpayserver.org/
- 확인일: 2026-10-05
