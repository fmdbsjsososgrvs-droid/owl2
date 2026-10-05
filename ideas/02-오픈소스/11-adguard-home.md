# AdGuard Home

- 분야: 프라이버시 / 네트워크 광고·추적 차단
- 라이선스: GPL-3.0
- 저장소: https://github.com/AdguardTeam/AdGuardHome
- 별: 약 3.7만 (2026-10-05 기준)
- 지원 플랫폼: Linux, macOS, FreeBSD, OpenBSD 등(자동 설치 스크립트 기준), Docker, 라즈베리파이

## 무엇을 하는가
집 네트워크 전체에 광고·추적 차단을 거는 DNS 서버다. 공유기 DNS를 AdGuard Home으로 바꿔 두면 휴대폰, TV, 게임기처럼 앱을 깔 수 없는 기기까지 모두 보호된다. 추적 도메인 조회를 "블랙홀"로 돌려서 연결 자체를 막는 방식.

## 왜 인기 있는가·기발한 점
- 클라이언트 소프트웨어가 필요 없다. 한 번 세팅하면 집 안 모든 기기에 적용.
- 웹 관리 화면이 깔끔하고, 어떤 기기가 어떤 도메인을 얼마나 부르는지 보여 줘서 "내 스마트 TV가 이렇게 많이 보고하네" 같은 발견을 하게 된다.
- 공용 AdGuard DNS 서버와 코드를 많이 공유하는 검증된 엔진. 최신 릴리스 v0.107.79(2026-08-18).

## 시작하는 법
```bash
curl -s -S -L https://raw.githubusercontent.com/AdguardTeam/AdGuardHome/master/scripts/install.sh | sh -s -- -v
```
설치 후 웹 설정 화면에서 관리자 계정을 만들고, 공유기의 DNS를 이 기기 IP로 지정한다.

## 아쉬운 점·대안
- README에 직접 적힌 한계: 유튜브·트위치 광고, SNS 스폰서 게시물처럼 콘텐츠와 같은 도메인에서 나오는 광고는 DNS 차단으로 못 막는다.
- DNS 서버가 죽으면 집 인터넷이 다 멈춘 것처럼 보이니 보조 DNS 설정을 고민하자.
- 대안: Pi-hole(같은 계열의 대표 프로젝트), 브라우저 쪽은 uBlock Origin.

## 출처
- https://github.com/AdguardTeam/AdGuardHome
- https://api.github.com/repos/AdguardTeam/AdGuardHome
- https://adguard.com/adguard-home/overview.html
- 확인일: 2026-10-05
