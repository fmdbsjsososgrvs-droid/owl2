# fzf

- 분야: 개발 도구 / CLI 생산성
- 라이선스: MIT
- 저장소: https://github.com/junegunn/fzf
- 별: 약 8.3만 (2026-10-05 기준)
- 지원 플랫폼: macOS, Linux, Windows (Go 단일 바이너리)

## 무엇을 하는가
명령줄용 범용 퍼지 파인더다. 아무 목록(파일, 명령 기록, git 브랜치, 프로세스…)을 fzf에 흘려 넣으면, 대충 몇 글자만 쳐도 원하는 항목을 골라 준다. 고른 결과는 다시 다른 명령으로 넘길 수 있다.

## 왜 인기 있는가·기발한 점
- 유닉스 철학의 모범생. "목록 입력 → 사람이 고름 → 출력"이라는 단순한 역할 하나로 수많은 쉘 스크립트를 인터랙티브 앱으로 바꿔 준다.
- 쉘 통합이 압권이다. `CTRL-R`로 명령 기록 검색, `CTRL-T`로 파일 경로 삽입, `ALT-C`로 디렉터리 이동, `vim **<TAB>` 자동완성.
- Bash, Zsh, Fish, Nushell, Vim, Neovim 연동이 기본 포함. 수백만 항목도 밀리초 단위로 처리한다고 소개한다.
- 한국 개발자(junegunn)가 만든 세계적 프로젝트로도 유명. 최신 릴리스 v0.74.4(2026-09-12).

## 시작하는 법
```bash
brew install fzf
echo 'source <(fzf --zsh)' >> ~/.zshrc   # zsh 키 바인딩 활성화
```
bash는 `eval "$(fzf --bash)"`.

## 아쉬운 점·대안
- 기본 기능만 쓰면 반쪽짜리. 미리보기(`--preview`)나 ripgrep·fd와 조합하는 설정을 해야 진가가 나온다.
- 대안: skim(Rust 구현), zoxide(디렉터리 이동 특화), atuin(명령 기록 특화).

## 출처
- https://github.com/junegunn/fzf
- https://api.github.com/repos/junegunn/fzf
- https://junegunn.github.io/fzf/
- 확인일: 2026-10-05
