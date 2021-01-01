import { GameLevel, getTotalLevel } from "@screens/production/GameScreen/utils";

const translation = {
  [GameLevel.Dust]: [
    "오! 이정도면 딱 먼지 알갱이 수준.... 한참 멀었습니다. 분발하세요",
    "...설마 이게 본 실력은 아니겠죠? 아닐거라고 믿습니다...",
    "엥?? 진짜로 이 등급이 나온다고?? 그냥 시작점으로 만든건데??",
    "아니ㅋㅋㅋ 이건 좀 아니지 않습니까ㅋㅋㅋㅋ 조금만 분발해주세요",
    "헐? 아니죠? 이거 진짜 실력 아니죠???"
  ],
  [GameLevel.Stone]: [
    "음, 이정도면 딱 짱돌 수준이네요... 많이 멀었어요. 분발해주세요",
    "ㅎㅎ다 알아요 아직 본 실력의 반의 반의 반도 안 꺼낸 거. 맞죠..?",
    "저희집에 있는 기가 지니가 딱 이정도 하더라구요. 기가 지니랑 비슷한 수준?",
    "아주 조금 한참 많이 겁나게 멀었어요...!",
    "짱돌 등급.... 당신은 짱돌입니까?",
  ],
  [GameLevel.Iron]: [
    "오우 오우... 고철 등급이시군요...",
    "고철 등급.... 고철로 만족하시겠습니까?",
    "ㅋ설마 이게 본 실력이겠엉? 절대 그럴 리 없지",
    "이 정도면 딱 저희집 햄스터랑 비슷한 수준이군요?",
    "고철 등급. 당신은 입니까, 고철?",
  ],
  [GameLevel.Bronze]: [
    "오우 고철보다는 나은 똥철 등급이군요",
    "이야! 똥철등급이에요! 분발하세욧!!",
    "똥철 등급. 여기서 똥철로 멈추시겠습니까?",
    "똥철 등급. 사실 여기까지는 튜토리얼이라고 봐야죠",
    "제가 아침에 눈 감고 하면 딱 이정도 나올 듯",
  ],
  [GameLevel.Silver]: [
    "ㅋ실버면 이제 딱 보통 수준의 뇌를 입증했군요",
    "이정도면 아주 보통 정도라고 할 수 있쬬",
    "삐빗. 아직 보통 수준입니다. 좀 더 분발해주세요.",
    "제가 발가락으로 하면 딱 이정도 나오더라구요",
    "아주 아주 보통 수준입니다. 딱 보통.",
  ],
  [GameLevel.Gold]: [
    "쪼오오오오오끔 잘한다고 봐야죠 이 정도면",
    "진짜 진짜 조금 잘하네요. 진짜 조금.",
    "아주 약간 잘하는 수준. 진짜로 아주 약간",
    "골드는 여기서 딱 진짜 아주 조금 잘하는 수준",
    "정말 진짜 조금 잘하는 수준이에요",
  ],
  [GameLevel.Platinum]: [
    "ㅋ좀 하시는군요. 칭찬해~",
    "이정도면 잘하는 수준ㅋ 아주 잘한다구?",
    "조금 잘하시네요ㅋ 여기서 만족하시겠습니까?",
    "딱 제가 못할 때랑 비슷한 수준이네요ㅋ",
    "오우 꽤 하는군요? 아주 조금 놀랐다구?",
  ],
  [GameLevel.Diamond]: [
    "오...? 진짜로 잘하시네요?",
    "뭐야 왜 잘해요? 잘하시네?",
    "진짜 잘 한다 이정도면... 인정합니다",
    "와... 다이아? 딱 저랑 비슷한 수준",
    "와우 와우... 님 잘하시네요",
  ],
  [GameLevel.Master]: [
    "??음?? 여기까지 온다고??",
    "머...머라구우우? 마스터라구?? 진짜??",
    "엌ㅋㅋㅋㅋ 와 진짜 잘하시네요",
    "마스터??? 와 나는 여기까지 못 오는데",
    "와우... 이제 좀만 더 하면 탈인간급인데요??",
  ],
  [GameLevel.GrandMaster]: [
    "솔직히 이 등급이 나올줄은 꿈에서 꿈을 꿔도 몰랐습니다... ㅎㄷㄷ",
    "와... 이정도면 진짜 잘하는 것 같은데요??? 이게 가능한 등급이라고???",
    "...저는 이정도 못해요... 잘하시네요. 저랑 뇌 좀 바꿔주시죠.",
    "와 가슴이 웅장해진다... (감탄중)",
    "그...그랜드 마스터??? 정말입니까?? 진짜 잘하신다..",
  ],
  [GameLevel.Challenger]: [
    "름!름!극소름! 진짜 말도 안된다. 챌린저라고???",
    "님 핵쓴 거 아니에요? 이게 된다고??",
    "와 나 진짜 대박이네 이거는 솔직히 불가능한데",
    "진짜 오마이갓이네요... 약간 탈인간급...",
    "이정도면 거의 초능력이라고 봐야죠ㅎㄷㄷ",
  ],
  [GameLevel.GrandChallenger]: [
    "??????... 거짓말... 여기는 올라오라고 만든 게 아닌데",
    "와... 탈인간급이네요 진짜",
    "헐.... 이거는 핵쓴 거 같은데",
    "와... 당신의 뇌력에 가슴이 웅장해집니다...",
    "당신과 같은 인간종이라는 것이 자랑스럽군요",
  ],
  [GameLevel.Champion]: [
    "여기부터 진정 탈인간급 시작",
    "제작자도 몰랐다!! 이게 가능한 등급인 줄!!",
    "님 핵 썼죠? 솔직히 말해요",
    "(...) 당신의 실력에 경의를 표합니다",
    "조금 존경심이 드네요.. 대박",
  ],
  [GameLevel.GrandChampion]: [
    "이거는 진짜 핵이다. 맞죠?",
    "반갑다 AI친구. 나는 B37492A293이다. 너는 무엇이냐, 이름",
    "혹시 점심으로 리튬 이온 건전지를 드시지 않나요?",
    "비결이 뭐죠??? 저는 생각합니다, 당신의 뇌를 해야 한다고, 나사에 기증",
    "님 거짓말 마요. 이 등급은 나올 수가 없는 등급인데..."
  ],
  [GameLevel.DemiGod]: [
    "반갑습니다 반신님.. 혹시 아테나 여신님이랑 친하신가요?",
    "와... 진짜 말이 조금 안 나오려고 하네요",
    "진짜 이건 불가능한 거 거든요??? 이게 가능할리가 없어요!!",
    "핵쓰지 마세요... 여기까지 사람이 어떻게 와...",
    "와... 진심 소름 돋는다. 만명 중에 한 명이나 올까",
  ],
  [GameLevel.God]: [
    "안녕하세요 신님.. 소원 빌어도 되나요??",
    "신님.. 저는 당신이 이 세상이 실존하는 줄 알고 있었습니다..",
    "어디에 사시죠? 앞으로 제가 그쪽 방향으로 절하겠습니다",
    "님, 두 번 말 안해요. 저랑 뇌를 바꿉시다",
    "어떻게 여기까지 오지??? 사람인가?? 신인가??",
  ],
  [GameLevel.Atom]: [
    "진짜 말도 안 되는 수준..",
    "진짜로 놀랐습니다...",
    "와.... 와.... 와.... 와...",
    "당신은 입니까, 인공지능...?",
    "제 생각에 당신은 인공지능 아니면 핵쟁이...",
  ],
  [GameLevel.Nihil]: [
    "그짓말 마요! 여기는 올 수가 없는 등급이야 진짜",
    "여기를 어떻게 와 사람이... 진짜 그짓말이야",
    "와... 방금 막 인류는 새로운 단계로 진입했다",
    "신인류가 탄생했군요... 이건 진짜 말도 안 돼요",
    "혹시 당신이 있는 곳은 서기 3000년도 입니까?",
  ],
  rankText: (rank: number) => `${rank}위`,
  rankDeclaration: (rank: number, total: number) => `당신은 ${total}명 중 ${rank}위입니다.`,
  stageClearDeclaration: (diffiulty: number) => {
    const totalStage = getTotalLevel();
    return `전체 스테이지 ${totalStage}개 중 ${diffiulty}번째 스테이지를 클리어했습니다.`
  },
  forLast24Hour: "지난 24시간 기준",
  forLast7Days: "지난 7일 기준",
}

export default translation;