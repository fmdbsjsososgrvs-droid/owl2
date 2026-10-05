# Ghostty

- 분야: 개발 도구 / 터미널 에뮬레이터
- 라이선스: MIT
- 저장소: https://github.com/ghostty-org/ghostty
- 별: 약 6.2만 (2026-10-05 기준)
- 지원 플랫폼: macOS(SwiftUI + Metal), Linux(GTK + OpenGL). 임베드용 라이브러리 libghostty는 더 넓은 플랫폼을 겨냥

## 무엇을 하는가
빠르고, 기능이 풍부하고, 각 OS에 네이티브한 UI를 쓰는 GPU 가속 터미널 에뮬레이터다. 보통 터미널은 셋 중 하나를 포기하는데(속도·기능·네이티브감) Ghostty는 셋 다 잡겠다는 게 목표다.

## 왜 인기 있는가·기발한 점
- macOS에서는 SwiftUI로, 리눅스에서는 GTK로 진짜 네이티브 앱을 만든다. 탭·분할·설정 창이 OS에 자연스럽게 녹아든다.
- 읽기·쓰기·렌더링을 각각 별도 스레드로 나눈 멀티스레드 구조와 GPU 렌더링으로 체감 속도가 좋다.
- 표준 준수에 공을 들였다. Kitty 그래픽 프로토콜, 클립보드 시퀀스, 동기화 렌더링 등 최신 터미널 기능 지원.
- 핵심을 C/Zig 라이브러리 `libghostty`(터미널 시퀀스 파서 `libghostty-vt` 포함)로 떼어 내 다른 앱이 터미널 기능을 임베드할 수 있게 했다.
- 최신 태그 v1.3.1.

## 시작하는 법
https://ghostty.org/download 에서 받는다. macOS는 `brew install --cask ghostty`. 설정은 텍스트 파일 하나로 관리한다.

## 아쉬운 점·대안
- Windows용 네이티브 앱은 아직 정식 제공 대상이 아니다.
- 설정 GUI보다 설정 파일 위주라 처음엔 문서를 좀 읽어야 한다.
- 대안: WezTerm, Kitty, Alacritty, iTerm2(macOS).

## 출처
- https://github.com/ghostty-org/ghostty
- https://api.github.com/repos/ghostty-org/ghostty (최근 푸시 2026-10-04)
- https://api.github.com/repos/ghostty-org/ghostty/tags
- https://ghostty.org
- 확인일: 2026-10-05
