# Ollama

- 분야: AI / 로컬 LLM
- 라이선스: MIT
- 저장소: https://github.com/ollama/ollama
- 별: 약 18.2만 (2026-10-05 기준)
- 지원 플랫폼: macOS, Windows, Linux (Docker 이미지도 있음)

## 무엇을 하는가
내 컴퓨터에서 대형 언어 모델(LLM)을 내려받아 바로 돌려 주는 실행기다. `ollama run 모델이름` 한 줄이면 모델 다운로드부터 대화창까지 끝난다. README 설명 기준으로 Qwen, Gemma, DeepSeek, gpt-oss, GLM 같은 공개 모델들을 지원하고, `localhost:11434`에 REST API를 띄워 줘서 다른 앱이 붙어 쓸 수 있다.

## 왜 인기 있는가·기발한 점
- "로컬 LLM = 복잡한 세팅"이라는 공식을 깼다. 모델 관리를 도커 이미지처럼 pull/run으로 단순화한 게 핵심.
- 파이썬(`pip install ollama`)·자바스크립트(`npm i ollama`) 라이브러리가 공식으로 있고, README에 연동 앱 목록이 엄청 길다. 사실상 로컬 LLM 생태계의 공용 백엔드.
- 대화 내용이 내 기기 밖으로 나가지 않아서 프라이버시 측면에서 의미가 크다.

## 시작하는 법
```bash
curl -fsSL https://ollama.com/install.sh | sh   # macOS/Linux
ollama run gemma3                                 # 예시 모델 실행
```
Windows는 PowerShell에서 `irm https://ollama.com/install.ps1 | iex`.

## 아쉬운 점·대안
- 쓸 만한 모델은 RAM/VRAM을 많이 먹는다. 저사양 노트북이면 작은 모델로 타협해야 한다.
- 설치 스크립트를 `curl | sh`로 받는 방식이 찜찜하면 수동 설치 문서를 따르자.
- 대안: 더 저수준으로 직접 만지고 싶으면 llama.cpp, GUI 중심이면 LM Studio(무료지만 오픈소스 아님).

## 출처
- https://github.com/ollama/ollama
- https://api.github.com/repos/ollama/ollama (별·라이선스·최근 푸시 2026-10-04, 최신 릴리스 v0.35.1 / 2026-09-29)
- https://ollama.com
- 확인일: 2026-10-05
