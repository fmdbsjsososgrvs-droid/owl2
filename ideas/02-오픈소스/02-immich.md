# Immich

- 분야: 셀프호스팅 / 사진·동영상
- 라이선스: AGPL-3.0
- 저장소: https://github.com/immich-app/immich
- 별: 약 11.6만 (2026-10-05 기준)
- 지원 플랫폼: 서버는 Docker 기반, 클라이언트는 웹 + 모바일 앱(iOS/Android)

## 무엇을 하는가
구글 포토·아이클라우드 사진을 내 서버로 옮겨 오는 셀프호스팅 사진/동영상 관리 시스템이다. 휴대폰 앱이 사진을 자동(백그라운드 포함) 백업하고, 웹과 앱에서 타임라인·앨범·지도·"N년 전 오늘" 추억 기능을 그대로 쓸 수 있다.

## 왜 인기 있는가·기발한 점
- 기능 목록이 상용 서비스 수준이다. 얼굴 인식·클러스터링, 객체 및 CLIP 기반 검색("바다에서 찍은 강아지" 같은 문장 검색), RAW 포맷, 라이브포토 재생, 파트너 공유, 다중 사용자, OAuth까지 지원.
- 모든 AI 분석이 내 서버 안에서 돌아가니 얼굴 데이터가 클라우드 회사로 가지 않는다.
- 개발 속도가 무척 빠르고 커뮤니티가 크다(최신 릴리스 v3.2.4, 2026-09-28).

## 시작하는 법
공식 문서(https://docs.immich.app/install/requirements)의 Docker Compose 설치를 따른다. `docker-compose.yml`과 `.env`를 받아 `docker compose up -d` 하는 흐름. 설치 전에 https://demo.immich.app 데모로 먼저 만져 볼 수 있다.

## 아쉬운 점·대안
- README 스스로 "3-2-1 백업 원칙을 꼭 지켜라"라고 경고한다. Immich 자체를 유일한 원본 저장소로 두면 안 된다.
- 머신러닝 기능 때문에 라즈베리파이급 기기에서는 다소 무겁다.
- 대안: PhotoPrism, Nextcloud Memories.

## 출처
- https://github.com/immich-app/immich
- https://api.github.com/repos/immich-app/immich
- https://immich.app / https://docs.immich.app/
- 확인일: 2026-10-05
