# Death by AI

- 유형: 파티 게임(디스코드, 웹, iOS) / 제작자: Little Umbrella(Playroom 툴킷 사용, 타비시 아흐메드 외) / 공개 시기: 2024년 / 사용한 AI: 초기 OpenAI GPT-3.5·GPT-4 + ElevenLabs 음성, 이후 Inworld로 전환 / 링크: https://discord.com/build-case-studies/playroom (공식 사이트 주소는 확인 못 함)

## 어떤 작품인가
최대 8명이 디스코드에서 같이 하는 생존 퀴즈 게임이에요. "좀비 떼가 몰려온다" 같은 위기 상황이 주어지면 각자 살아남을 방법을 글로 적어요. 그러면 AI 사회자가 각 플레이어의 계획을 듣고 살았는지 죽었는지 판정하고, 그 과정을 웃기게 이야기로 풀어줘요. 잭박스 게임처럼 친구들끼리 깔깔대는 맛이 있어요.

## 왜 평가가 좋은가
- 출시 3개월 만에 플레이어 2천만 명(TechCrunch, 2025-01-30).
- Inworld 사례 글: 출시 3일째 일일 사용자 70만 명, 첫 달 1천만 명, 누적 플레이 300만 시간.
- 첫 달에만 토큰 12억 개를 썼을 정도로 사용량이 폭발했어요.
- 2025년 1월 a16z speedrun 등에서 시드 200만 달러를 받았어요.

## AI를 어떻게 썼나
LLM이 플레이어 답변을 읽고 생존 여부와 결과 묘사를 만들고, TTS가 사회자 목소리를 입혀요. 처음엔 비용이 감당이 안 돼서 게임용 요금제를 주는 Inworld로 옮겨 흑자를 냈다고 해요.

## 생각해볼 점
AI 게임은 인기가 많을수록 API 비용이 늘어나는 구조라는 걸 보여준 사례예요. "재밌다"와 "돈이 된다" 사이의 간극을 어떻게 메우느냐가 관건이에요.

## 출처
- https://techcrunch.com/2025/01/30/little-umbrellas-next-jackbox-style-game-pits-you-and-your-friends-against-an-ai-game-show-host
- https://inworld.ai/blog/how-inworld-helped-the-ai-game-death-by-ai-with-20-million-players-reach-profitability
- https://discord.com/build-case-studies/playroom
- 확인일: 2026-10-05
