# Vaultwarden

- 분야: 보안 / 비밀번호 관리 / 셀프호스팅
- 라이선스: AGPL-3.0
- 저장소: https://github.com/dani-garcia/vaultwarden
- 별: 약 6.9만 (2026-10-05 기준)
- 지원 플랫폼: 서버(Docker 컨테이너 권장, Rust로 작성). 클라이언트는 기존 Bitwarden 앱·브라우저 확장 사용

## 무엇을 하는가
Bitwarden 비밀번호 관리자와 호환되는 서버를 Rust로 다시 구현한 비공식 프로젝트다(옛 이름 bitwarden_rs). 내 서버에 띄워 두면 Bitwarden 공식 클라이언트들을 그대로 연결해서 비밀번호 금고를 직접 운영할 수 있다.

## 왜 인기 있는가·기발한 점
- 공식 Bitwarden 서버보다 훨씬 가볍게 돌아가서 작은 VPS나 홈서버에서도 부담이 적다.
- 클라이언트 생태계는 Bitwarden 것을 그대로 쓰니 사용 경험은 익숙하고, 데이터 보관 위치만 내 손으로 가져온다.
- 컨테이너 이미지가 ghcr.io, docker.io, quay.io에 모두 올라와 있다. 최신 릴리스 1.37.3(2026-09-13)으로 꾸준히 업데이트 중.

## 시작하는 법
```bash
docker run --detach --name vaultwarden \
  --env DOMAIN="https://vw.domain.tld" \
  --volume /vw-data/:/data/ --restart unless-stopped \
  --publish 127.0.0.1:8000:80 vaultwarden/server:latest
```
브라우저 클라이언트가 동작하려면 HTTPS가 필요하니 리버스 프록시를 앞에 두자(자세한 건 Wiki).

## 아쉬운 점·대안
- "비공식"이다. Bitwarden 사와 무관하고, 문제가 생겨도 Bitwarden 공식 지원 대상이 아니다.
- 비밀번호 금고를 직접 운영한다는 건 백업·업데이트·노출 관리 책임도 내가 진다는 뜻.
- 대안: Bitwarden 공식 셀프호스팅, 서버 없이 파일로 관리하는 KeePassXC.

## 출처
- https://github.com/dani-garcia/vaultwarden
- https://api.github.com/repos/dani-garcia/vaultwarden
- https://github.com/dani-garcia/vaultwarden/wiki
- 확인일: 2026-10-05
