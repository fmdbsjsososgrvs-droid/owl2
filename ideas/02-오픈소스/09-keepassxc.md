# KeePassXC

- 분야: 보안 / 비밀번호 관리(오프라인)
- 라이선스: GPL-2.0 또는 GPL-3.0 (선택)
- 저장소: https://github.com/keepassxreboot/keepassxc
- 별: 약 2.9만 (2026-10-05 기준)
- 지원 플랫폼: Windows, macOS, Linux

## 무엇을 하는가
서버도 계정도 없이 암호화된 파일(KDBX) 하나로 비밀번호를 관리하는 데스크톱 앱이다. 윈도우용 KeePass를 크로스플랫폼으로 이식한 커뮤니티 프로젝트로, KDBX4/KDBX3 형식과 호환된다.

## 왜 인기 있는가·기발한 점
- 클라우드에 금고를 맡기지 않는다. 파일을 어디에 두고 어떻게 백업할지 내가 정한다. 에어갭 컴퓨터에서도 그대로 쓸 수 있다.
- YubiKey/OnlyKey 챌린지-응답 지원으로 하드웨어 키를 두 번째 인증 요소로 쓸 수 있다.
- TOTP 생성, 브라우저 연동(Tor Browser 포함), 패스키, SSH 에이전트 연동, `keepassxc-cli`, HIBP 기반 비밀번호 건강 보고서까지 지원.
- 1Password, Bitwarden, Proton Pass 등에서 가져오기가 된다.

## 시작하는 법
https://keepassxc.org/download 에서 받아 새 데이터베이스를 만들고 강한 마스터 비밀번호(필요하면 키 파일·YubiKey 추가)를 설정한다. macOS는 `brew install --cask keepassxc`.

## 아쉬운 점·대안
- 기기 간 동기화는 직접 해결해야 한다(Syncthing 등과 조합). 동시 편집 충돌에 주의.
- 공식 모바일 앱은 없다. 모바일은 KDBX 호환 앱(예: Android KeePassDX, iOS Strongbox/KeePassium)을 쓴다.
- 대안: Bitwarden/Vaultwarden(서버형).

## 출처
- https://github.com/keepassxreboot/keepassxc
- https://github.com/keepassxreboot/keepassxc/blob/develop/COPYING
- https://api.github.com/repos/keepassxreboot/keepassxc (최신 릴리스 2.7.12 / 2026-03-10, 최근 푸시 2026-09-30)
- https://keepassxc.org/
- 확인일: 2026-10-05
