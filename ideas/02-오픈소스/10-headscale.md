# Headscale

- 분야: 셀프호스팅 / 네트워크·VPN
- 라이선스: BSD-3-Clause
- 저장소: https://github.com/juanfont/headscale
- 별: 약 4.4만 (2026-10-05 기준)
- 지원 플랫폼: 서버(Linux 등), 클라이언트는 Tailscale 공식 클라이언트 사용

## 무엇을 하는가
Tailscale의 "컨트롤 서버"를 오픈소스로 직접 구현한 것이다. Tailscale은 WireGuard 기반으로 기기들을 하나의 사설망(tailnet)으로 묶어 주는 VPN인데, 클라이언트는 대부분 오픈소스지만 기기 등록·키 교환·IP 할당을 맡는 컨트롤 서버는 Tailscale 회사가 운영한다. Headscale은 그 부분을 내 서버로 가져온다.

## 왜 인기 있는가·기발한 점
- Tailscale의 편한 NAT 통과·메시 네트워크는 그대로 누리면서, "누가 내 네트워크에 들어올지"를 결정하는 서버는 내가 가진다.
- 범위를 일부러 좁게 잡았다. 개인이나 소규모 오픈소스 조직을 위한 단일 tailnet만 구현한다고 README에 명시돼 있다.
- 홈서버·NAS·노드에 밖에서 안전하게 접속하는 용도로 셀프호스터들에게 사랑받는다. 최신 릴리스 v0.29.4(2026-09-23).

## 시작하는 법
https://headscale.net/stable/ 의 설치 문서를 따라 서버에 headscale을 띄우고, 각 기기의 Tailscale 클라이언트에서 로그인 서버를 내 headscale 주소로 지정한다(`tailscale up --login-server https://내서버`).

## 아쉬운 점·대안
- 1.0 이전 버전(0.x)이라 설정 형식이 버전마다 바뀔 수 있다.
- Tailscale의 모든 기능을 다 구현하진 않는다. 지원 기능 목록을 문서에서 확인하자.
- 대안: 순수 WireGuard 수동 구성, NetBird, Nebula.

## 출처
- https://github.com/juanfont/headscale
- https://api.github.com/repos/juanfont/headscale
- https://headscale.net/stable/
- 확인일: 2026-10-05
