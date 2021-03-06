# 몽글우체국(가제)

## 기획의도 
- 익명의 사용자가 고민을 게재하면 기명의 사용자가 그 고민에 대해서 편지를 보내준다.
- 누구나 일상을 살아가다보면 넘어지고 다치는 순간이 생깁니다. 그 순간들에 이 페이지가 밴드 정도만 되도 괜찮을 것 같습니다.

## 팀원들이 생각한 웹페이지의 느낌

![Group 30](https://user-images.githubusercontent.com/55477835/177790010-706e97b8-a65c-4009-aafc-d40aef1a8292.png)

따뜻함과 편안함, 자연, 종이질감의 텍스쳐 괴로운 상황을 편안하게 만들어준다는 스토리텔링까지 담겨서 기획의도를 더 명확하게 가져가고 페이지의 테마를 정하는데 도움을 받을 수 있었습니다.

## 테마색상

![Group 31](https://user-images.githubusercontent.com/55477835/177790475-5b13c5f2-38d9-4801-8e50-ca58aa3c2594.png)

## 페이지 목업
![](https://velog.velcdn.com/images/aboutjoo/post/6456f187-1956-4b54-ba3e-d1b609052f4b/image.png)


정한 테마 색상을 토대로 편지를 쓴다는 컨셉에 맞게 편지를 작성할 수 있고 접근성이 너무 낮다는 팀원들의 피드백에 맞춰 익명 게시판도 만들게 되었습니다.

## 메인 캐릭터 - 몽글이
![](https://velog.velcdn.com/images/aboutjoo/post/a0f5bc54-0c1e-446b-a1cd-77ffa918a7b8/image.jpeg)

## 사용기술
- 딥러닝을 활용한 비속어 필터링 기술
페이지의 의도와 맞지않는 편지내용이 들어갈 수도 있으므로 비속어나 비방언어를 사용하면 편지를 쓰지 못하게 막는다.
https://github.com/smilegate-ai/korean_unsmile_dataset
- 블랙을 사용하여 ci시 python 코드 포매팅
- github action과 도커를 통한 ci/cd 기능 구현

## ERD

![mail_box](https://user-images.githubusercontent.com/101394490/178623485-8189e5c6-a4ea-4aad-b5ae-10b0dc251ae1.png)


## api명세서 
https://thinkable-sassafras-50a.notion.site/ab237d868d5d46d0a159bc07b523cdb3?v=9442da6f0ae744fea4619ad4f7d6a8f5

## 컨벤션
- feat/ : 새로운 기능 추가/수정/삭제
- enhan/ : 기존 코드에 기능을 추가하거나 기능을 강화할 때
- refac/ : 코드 리팩토링,버그 수정
- test/ : 테스트 코드/기능 추가
- edit/ : 파일을 수정한 경우(파일위치변경, 파일이름 변경, 삭제)

## 그라운드 룰
1. 작업 단위로 팀원들에게 공유하기(매일 오후5시) and 하루 일정 공유하기(매일 오전 9시)
2. 저녁7시에 TIL 작성후 팀원들과 피드백
3. API 작업시 변동사항 API 설계 업데이트 하기.
4. PULL REQUESTS 작업시 다같이 라이브로 수정한다 or 주맨이 대표로 리뷰하고 merge 한다.
5. 자기가 맡은 역할 기간 안에 최선을 다해서 끝내기. ( 당연할 수록 어려움 )
6. 어렵거나 막히는 부분 있으면 팀원들이나 튜터님한테 적극적으로 소통하고 팀원들과 같이 해결하기.
11. 공통 파일 수정 후 main 브랜치에 머지한다면 모두가 풀한 후 작업을 다시 시작한다.
7. 하진이형이 형 동생들 멘탈 잘 잡아주기
8. 쉬는 시간 챙기면서 일하기.
9. 밤샘 금지
10. 아프면 바로 말해서 휴식 취하기!

