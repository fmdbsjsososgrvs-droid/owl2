# Uptime Kuma

- 분야: 셀프호스팅 / 모니터링
- 라이선스: MIT
- 저장소: https://github.com/louislam/uptime-kuma
- 별: 약 9.2만 (2026-10-05 기준)
- 지원 플랫폼: Docker, 주요 Linux 배포판(Debian, Ubuntu, Fedora, Arch 등), Windows 10(x64)/Windows Server 2012 R2 이상

## 무엇을 하는가
내 웹사이트·서버·서비스가 살아 있는지 주기적으로 확인하고, 죽으면 알려 주는 셀프호스팅 모니터링 도구다. "UptimeRobot 같은 걸 내 서버에서"라는 동기로 시작됐다고 README에 적혀 있다.

## 왜 인기 있는가·기발한 점
- 감시 방식이 다양하다: HTTP(s), 키워드, JSON 쿼리, TCP, Ping, DNS 레코드, WebSocket, Push, Docker 컨테이너, 게임 서버까지.
- 알림 채널이 90개 이상(텔레그램, 디스코드, 슬랙, 이메일, Gotify, Pushover 등). 최소 20초 간격 체크.
- UI가 예쁘고 반응이 빠르다. 여러 개의 상태 페이지를 만들어 도메인에 연결할 수 있고, 인증서 정보·2FA·프록시도 지원.
- 2.x 계열로 활발히 개발 중(최신 릴리스 2.5.5, 2026-09-16).

## 시작하는 법
```bash
docker run -d --restart=always -p 3001:3001 -v uptime-kuma:/app/data --name uptime-kuma louislam/uptime-kuma:2
```
`http://localhost:3001` 접속 후 관리자 계정을 만든다.

## 아쉬운 점·대안
- README 경고: NFS 같은 네트워크 파일시스템에 데이터를 두면 안 된다. 로컬 디렉터리나 볼륨을 쓰자.
- 감시 대상과 같은 서버에 두면 서버가 통째로 죽을 때 알림도 같이 죽는다. 별도 기기에 두는 게 좋다.
- 대안: Gatus, Prometheus + Alertmanager(본격 메트릭), Healthchecks.io(크론 감시).

## 출처
- https://github.com/louislam/uptime-kuma
- https://api.github.com/repos/louislam/uptime-kuma
- https://uptime.kuma.pet
- 확인일: 2026-10-05
