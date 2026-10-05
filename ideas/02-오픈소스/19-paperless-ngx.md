# Paperless-ngx

- 분야: 생산성 / 문서 관리 / 셀프호스팅
- 라이선스: GPL-3.0
- 저장소: https://github.com/paperless-ngx/paperless-ngx
- 별: 약 4.6만 (2026-10-05 기준)
- 지원 플랫폼: 셀프호스팅 서버(Docker Compose 권장), 웹 UI

## 무엇을 하는가
종이 문서를 스캔해 검색 가능한 온라인 아카이브로 바꿔 주는 문서 관리 시스템이다. 고지서·계약서·영수증·보증서를 스캔해 넣으면 OCR로 글자를 뽑고, 태그·문서 유형·거래처별로 정리해서 나중에 전문 검색으로 찾을 수 있다. 이름 그대로 "종이를 덜(less paper)".

## 왜 인기 있는가·기발한 점
- 원조 Paperless → Paperless-ng를 이어받은 공식 후계 프로젝트로, 한 사람이 아니라 팀이 유지보수하도록 구조를 바꿨다. 덕분에 꾸준히 살아 있다(최신 릴리스 v3.2.1, 2026-09-20).
- 민감한 개인 문서(세금, 의료, 금융)를 클라우드가 아닌 내 서버에 둘 수 있다.
- 공개 데모(demo.paperless-ngx.com, demo/demo)로 먼저 써 볼 수 있다.

## 시작하는 법
```bash
bash -c "$(curl -L https://raw.githubusercontent.com/paperless-ngx/paperless-ngx/main/install-paperless-ngx.sh)"
```
설치 스크립트가 docker compose 환경을 구성해 준다. 다른 방법은 https://docs.paperless-ngx.com/setup/#installation 참고.

## 아쉬운 점·대안
- 스캐너 → 지정 폴더 → 자동 수집 흐름을 잡기까지 초기 설정 손이 간다.
- 민감 문서가 모이는 만큼 서버 보안과 백업을 더 신경 써야 한다. 데모에는 절대 진짜 문서를 올리지 말 것.
- 대안: Docspell, Mayan EDMS.

## 출처
- https://github.com/paperless-ngx/paperless-ngx
- https://api.github.com/repos/paperless-ngx/paperless-ngx
- https://docs.paperless-ngx.com/
- 확인일: 2026-10-05
