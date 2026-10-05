# whisper.cpp

- 분야: AI / 로컬 음성 인식(STT)
- 라이선스: MIT
- 저장소: https://github.com/ggml-org/whisper.cpp
- 별: 약 5.4만 (2026-10-05 기준)
- 지원 플랫폼: macOS(Intel/Apple Silicon), iOS, Android, Linux, FreeBSD, Windows, WebAssembly, 라즈베리파이, Docker

## 무엇을 하는가
OpenAI의 음성 인식 모델 Whisper를 C/C++로 다시 구현해서 내 컴퓨터에서 빠르게 돌려 주는 프로젝트다. 녹음 파일을 넣으면 텍스트 자막이 나온다. 회의록, 인터뷰 받아쓰기, 영상 자막 만들기를 클라우드에 음성을 올리지 않고 할 수 있다.

## 왜 인기 있는가·기발한 점
- 의존성 없는 순수 C/C++ 구현. 런타임 메모리 할당이 없고 정수 양자화를 지원해 저사양 기기에서도 돌아간다.
- Apple Silicon을 "일등 시민"으로 대접한다(NEON, Accelerate, Metal, Core ML). NVIDIA, AMD ROCm, Vulkan, OpenVINO 등 가속기 지원도 폭넓다.
- 음성 구간 검출(VAD), C 스타일 API 제공. llama.cpp와 같은 ggml 계열 프로젝트다.
- 최신 릴리스 v1.9.4(2026-09-11).

## 시작하는 법
```bash
git clone https://github.com/ggml-org/whisper.cpp.git && cd whisper.cpp
sh ./models/download-ggml-model.sh base.en
cmake -B build && cmake --build build -j --config Release
./build/bin/whisper-cli -f samples/jfk.wav
```
CLI 예제는 16비트 WAV만 받으니 `ffmpeg -i in.mp3 -ar 16000 -ac 1 -c:a pcm_s16le out.wav`로 변환.

## 아쉬운 점·대안
- 직접 빌드가 기본이라 비개발자에겐 문턱이 있다. 한국어 정확도는 모델 크기(작은 모델일수록 떨어짐)에 크게 좌우된다.
- 대안: faster-whisper(파이썬), whisper.cpp를 내장한 GUI 앱들.

## 출처
- https://github.com/ggml-org/whisper.cpp
- https://api.github.com/repos/ggml-org/whisper.cpp
- 확인일: 2026-10-05
