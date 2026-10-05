# yt-dlp

- 분야: 미디어 / 동영상·오디오 다운로더
- 라이선스: Unlicense (퍼블릭 도메인 성격)
- 저장소: https://github.com/yt-dlp/yt-dlp
- 별: 약 19.6만 (2026-10-05 기준)
- 지원 플랫폼: Windows, macOS, Linux 등(파이썬 기반, 단독 실행 파일도 배포)

## 무엇을 하는가
수천 개 사이트에서 동영상·오디오를 내려받는 명령줄 도구다. 원조 youtube-dl에서, 지금은 비활성화된 youtube-dlc를 거쳐 갈라져 나온 포크로, 사실상 현재 표준 다운로더 자리를 차지했다.

## 왜 인기 있는가·기발한 점
- 지원 사이트 목록(supportedsites.md)이 압도적으로 길고, 사이트 쪽 변경에 대응하는 업데이트가 빠르다(최신 릴리스 2026.08.19, 날짜형 버전).
- 포맷 선택, 자막·썸네일·메타데이터 저장, 재생목록 일괄 처리, 지역 제한 옵션 등 옵션이 방대하다.
- 다른 많은 미디어 앱이 내부 엔진으로 yt-dlp를 쓴다.

## 시작하는 법
```bash
python -m pip install -U "yt-dlp[default]"   # 또는 brew install yt-dlp
yt-dlp "영상URL"
```
고화질 병합에는 ffmpeg가 필요하다.

## 아쉬운 점·대안
- 사이트들이 계속 차단 방식을 바꾸기 때문에 "잘 되던 게 갑자기 안 되는" 일이 잦다. 자주 업데이트(`yt-dlp -U`)해야 한다.
- 각 사이트 이용약관과 저작권은 사용자가 스스로 지켜야 한다.
- 대안: GUI를 원하면 yt-dlp를 감싼 프런트엔드 앱들, 원조 youtube-dl.

## 출처
- https://github.com/yt-dlp/yt-dlp
- https://api.github.com/repos/yt-dlp/yt-dlp
- https://pypi.org/project/yt-dlp
- 확인일: 2026-10-05
