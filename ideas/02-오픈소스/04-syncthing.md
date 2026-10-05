# Syncthing

- 분야: 셀프호스팅 / 파일 동기화 / 프라이버시
- 라이선스: MPL-2.0
- 저장소: https://github.com/syncthing/syncthing
- 별: 약 8.9만 (2026-10-05 기준)
- 지원 플랫폼: Windows, macOS, Linux 등(Go 기반, Docker 이미지 있음)

## 무엇을 하는가
기기들끼리 폴더를 계속 동기화해 주는 프로그램이다. 드롭박스처럼 중앙 클라우드에 올리는 게 아니라, 내 기기와 기기가 직접 주고받는다. 노트북·데스크톱·홈서버 사이에 같은 폴더를 유지하는 데 딱이다.

## 왜 인기 있는가·기발한 점
- README에 목표가 우선순위대로 적혀 있다: 1) 데이터 손실 방지 2) 공격자로부터 안전 3) 쉬운 사용 … 순서. "기능보다 데이터 안전이 먼저"라는 철학이 명확하다.
- 계정 가입이 필요 없다. 기기 ID를 서로 등록하면 끝.
- 2025~2026년에도 v2 계열로 활발히 릴리스 중(최신 v2.1.5, 2026-09-08).

## 시작하는 법
https://syncthing.net 에서 받아 실행하면 웹 GUI(기본 `http://127.0.0.1:8384`)가 뜬다. 두 기기에서 서로 기기 ID를 추가하고 공유할 폴더를 고르면 된다. macOS는 `brew install syncthing`도 가능.

## 아쉬운 점·대안
- 동기화는 백업이 아니다. 한쪽에서 지우면 다른 쪽도 지워진다(버전 관리 옵션을 켜 두자).
- 처음엔 "폴더 ID·기기 ID" 개념이 낯설 수 있다.
- 대안: Resilio Sync(비공개 소스), Nextcloud(서버 중심).

## 출처
- https://github.com/syncthing/syncthing
- https://api.github.com/repos/syncthing/syncthing
- https://syncthing.net/
- 확인일: 2026-10-05
