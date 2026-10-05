# LocalSend

- 분야: 생산성 / 파일 전송 / 프라이버시
- 라이선스: Apache-2.0
- 저장소: https://github.com/localsend/localsend
- 별: 약 9.3만 (2026-10-05 기준)
- 지원 플랫폼: Windows, macOS, Linux, Android, iOS, Fire OS

## 무엇을 하는가
"오픈소스 크로스플랫폼 에어드롭"이다. 같은 와이파이(로컬 네트워크)에 있는 기기끼리 파일과 텍스트를 주고받는다. 아이폰 ↔ 윈도우, 안드로이드 ↔ 맥처럼 에어드롭이 안 되는 조합에서 특히 유용하다.

## 왜 인기 있는가·기발한 점
- 인터넷 연결이나 외부 서버가 필요 없다. REST API + HTTPS 암호화로 기기끼리 직접 통신한다.
- 설치 경로가 정말 다양하다: 앱스토어, Play 스토어, F-Droid, Winget, Homebrew, Flathub, AUR 등.
- 계정·로그인이 없어서 가족 기기에 깔아 주기 쉽다.

## 시작하는 법
보내는 쪽과 받는 쪽 모두 앱을 설치하고 같은 네트워크에서 실행하면 서로가 목록에 뜬다.
```bash
brew install --cask localsend   # macOS 예시
```
리눅스 방화벽을 쓰면 53317 포트(TCP/UDP)를 열어야 한다(README 안내).

## 아쉬운 점·대안
- 같은 로컬 네트워크가 아니면 못 쓴다. 멀리 있는 사람에게 보낼 땐 다른 수단이 필요.
- 공용 와이파이처럼 기기 격리된 네트워크에서는 서로 안 보일 수 있다.
- 대안: 원격 전송은 Magic Wormhole(CLI), 지속 동기화는 Syncthing.

## 출처
- https://github.com/localsend/localsend
- https://api.github.com/repos/localsend/localsend (최신 릴리스 v1.18.2 / 2026-08-21)
- https://localsend.org
- 확인일: 2026-10-05
