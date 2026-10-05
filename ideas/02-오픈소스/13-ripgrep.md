# ripgrep (rg)

- 분야: 개발 도구 / CLI 검색
- 라이선스: MIT 또는 Unlicense (이중 라이선스)
- 저장소: https://github.com/BurntSushi/ripgrep
- 별: 약 6.9만 (2026-10-05 기준)
- 지원 플랫폼: Windows, macOS, Linux (릴리스마다 바이너리 제공)

## 무엇을 하는가
현재 디렉터리를 재귀적으로 뒤져 정규식 패턴을 찾는 줄 단위 검색 도구다. grep, ack, The Silver Searcher(ag)의 후계자 같은 위치. 명령어는 `rg`.

## 왜 인기 있는가·기발한 점
- 빠르다. README에 리눅스 커널 소스 전체 검색 벤치마크로 다른 도구들과 비교해 놨다(작성자 본인도 "벤치마크 하나로 판단하지 말라"고 덧붙임).
- 기본값이 똑똑하다. `.gitignore` 규칙을 존중하고 숨김 파일과 바이너리 파일을 자동으로 건너뛴다. 필터를 다 끄고 싶으면 `rg -uuu`.
- Rust로 작성돼 단일 바이너리로 어디서든 같은 동작. VS Code 검색 기능 내부에서도 쓰이는 것으로 유명하다.
- 최신 릴리스 15.2.0(2026-07-15).

## 시작하는 법
```bash
brew install ripgrep      # macOS
rg "TODO" src/            # src 아래에서 TODO 검색
```
Debian/Ubuntu는 `apt install ripgrep`, Windows는 winget·scoop 등으로 설치.

## 아쉬운 점·대안
- grep과 옵션·기본 동작이 달라서 스크립트에서 grep을 그대로 바꿔 끼우면 결과가 다를 수 있다(특히 gitignore 필터링).
- 대안: GNU grep, ugrep, The Silver Searcher.

## 출처
- https://github.com/BurntSushi/ripgrep
- https://api.github.com/repos/BurntSushi/ripgrep
- 확인일: 2026-10-05
