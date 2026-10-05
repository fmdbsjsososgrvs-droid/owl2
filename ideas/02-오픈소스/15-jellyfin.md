# Jellyfin

- 분야: 미디어 / 셀프호스팅 미디어 서버
- 라이선스: GPL-2.0
- 저장소: https://github.com/jellyfin/jellyfin (서버 백엔드)
- 별: 약 5.8만 (2026-10-05 기준)
- 지원 플랫폼: 서버는 .NET 기반 크로스플랫폼(Windows, macOS, Linux, Docker). 클라이언트는 웹 + 여러 기기용 앱

## 무엇을 하는가
내가 가진 영화·드라마·음악을 정리해서 넷플릭스처럼 스트리밍해 주는 미디어 서버다. 포스터·메타데이터를 붙여 라이브러리를 만들고, TV·휴대폰·브라우저에서 재생한다. 필요하면 ffmpeg로 실시간 트랜스코딩도 한다.

## 왜 인기 있는가·기발한 점
- Plex·Emby의 완전 자유 소프트웨어 대안이다. README 표현대로 "프리미엄 라이선스도, 유료 기능도, 숨은 의도도 없다". 계정 가입이나 외부 서버 인증이 필요 없다.
- Emby 3.5.2에서 갈라져 나와 .NET으로 이식된 역사가 있다. Emby가 비공개로 전환하자 커뮤니티가 포크한 사례.
- 꾸준한 개발(최신 릴리스 v12.1, 2026-09-15).

## 시작하는 법
https://jellyfin.org 의 다운로드 페이지에서 OS별 패키지를 받거나 Docker 이미지를 쓴다. 설치 후 웹 마법사에서 관리자 계정과 미디어 폴더를 지정하면 끝.

## 아쉬운 점·대안
- 외부 접속(집 밖에서 보기)은 직접 리버스 프록시나 VPN(Headscale/Tailscale 등)으로 해결해야 한다.
- 일부 기기용 클라이언트 완성도가 Plex보다 들쭉날쭉하다는 평이 있다.
- 대안: Plex, Emby(둘 다 비공개 소스 부분 포함), 음악 전용은 Navidrome.

## 출처
- https://github.com/jellyfin/jellyfin
- https://api.github.com/repos/jellyfin/jellyfin
- https://jellyfin.org / https://jellyfin.org/docs/
- 확인일: 2026-10-05
