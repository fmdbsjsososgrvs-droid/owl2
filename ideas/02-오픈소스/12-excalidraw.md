# Excalidraw

- 분야: 생산성 / 화이트보드·다이어그램
- 라이선스: MIT
- 저장소: https://github.com/excalidraw/excalidraw
- 별: 약 13.4만 (2026-10-05 기준)
- 지원 플랫폼: 웹 브라우저(PWA, 오프라인 동작), npm 패키지로 다른 앱에 임베드 가능

## 무엇을 하는가
손으로 그린 듯한 느낌의 무한 캔버스 화이트보드다. 사각형·원·화살표·자유 그리기로 아키텍처 그림, 와이어프레임, 설명용 도식을 빠르게 그린다. excalidraw.com에서 바로 쓸 수 있고, 같은 저장소의 React 컴포넌트를 내 앱에 넣을 수도 있다.

## 왜 인기 있는가·기발한 점
- "삐뚤빼뚤한 손그림 스타일"이 기발하다. 완성품이 아니라 초안처럼 보여서 회의 중에 부담 없이 그리고 고치게 된다.
- 실시간 협업이 종단간 암호화(E2EE)된다. 공유 링크의 키가 서버에 가지 않는 구조.
- 로컬 우선: 브라우저에 자동 저장되고, `.excalidraw` JSON이라는 열린 형식으로 내보낸다. PNG/SVG 내보내기도 지원.
- 화살표 연결(바인딩), 도형 라이브러리, 다크 모드 지원.

## 시작하는 법
그냥 https://excalidraw.com 에 접속하면 된다. 개발자라면 `npm install @excalidraw/excalidraw`로 컴포넌트를 가져와 임베드.

## 아쉬운 점·대안
- 정밀한 도면이나 대형 다이어그램 관리에는 맞지 않는다.
- 클라우드 저장·팀 기능은 유료 Excalidraw+ 쪽에 있다.
- 대안: draw.io(diagrams.net), tldraw.

## 출처
- https://github.com/excalidraw/excalidraw
- https://api.github.com/repos/excalidraw/excalidraw (최근 푸시 2026-10-01, 최신 릴리스 v0.18.1 / 2026-04-21)
- https://excalidraw.com
- 확인일: 2026-10-05
