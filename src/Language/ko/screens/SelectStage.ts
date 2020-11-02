const translation = {
  navTitle: "싱글 플레이",
  currentRank: "현재 랭크",
  rankChangeProgess: "랭크 변화 추이",
  loadingData: "데이터를 불러오는 중",
  notEnoughData: "데이터가 부족합니다",
  close: "닫기",
  singlePlayPerformance: "싱글 플레이 성적",
  checkConnection: "인터넷 연결 상태를 확인해주세요",
  noPlayData: "플레이 데이터가 없습니다",
  recentUpdate: "최근 업데이트 날짜",
  noData: "흠, 기록이 없군요?",
  name: "이름",
  lastClearDifficulty: "최종 클리어 난이도",
  rank: "순위",
  rankText: (rank: number) => `${rank}위`,
  top: "앞에서",
  percentile: "백분위",
  ticketPurchase: "티켓 구매",
  purchaseQuantity: "구매 수량",
  purchase: "구매하기",
  cancel: "취소하기",
  challenge: "챌린지",
  rankToChallenge: "도전할 랭크",
  challengeDes: "티켓을 하나 소모하여 더 높은 난이도에 도전합니다.",
  challengeReward: "챌린지모드 보상",
  challengeRewardDes: ":10골드 + 10골드 * (0 + ...연승횟수) * 2",
  challengeRewardEx1: "예) 1승: 10골드 + 10골드(0 + 1) * 2 = 30골드",
  challengeRewardEx2: "예) 2연승: 10골드 + 10골드(0 + 1 + 2) * 2 = 70골드",
  challengeRewardEx3: "예) 3연승: 10골드 + 10골드(0 + 1 + 2 + 3) * 2 = 130골드",
  rewardTotal: "3연승 시 획득 골드 총합: 230골드",
  start: "시작하기",
  practice: "연습하기",
  rankToPractice: "연습할 랭크",
  practiceDes: "연습을 통해 실력을 향상시키고 골드를 획득합니다",
  practiceReward: "연습모드 보상",
  practiceRewardDes: ":10골드 + 10골드 * (0 + ...연승횟수)",
  practiceRewardEx1: "예) 1승: 10골드 + 10골드(0 + 1) = 20골드",
  practiceRewardEx2: "예) 2연승: 10골드 + 10골드(0 + 1 + 2) = 40골드",
  practiceRewardEx3: "예) 3연승: 10골드 + 10골드(0 + 1 + 2 + 3) = 70골드",
  practiceRewardTotal: "3연승 시 획득 골드 총합: 130골드",
  adAdvert: "10% 확률로 광고가 나타납니다.",
  loadingAd: "광고 로딩중",
  cantLoadAd: "광고가 다 떨어졌습니다",
  getGold: "골드 얻기",
  notEnoughGold: "골드가 부족합니다",
  requiredGold: "필요한 골드",
  havingGold: "보유한 골드",
  notEnoughGoldMessage: (goldToPay: number) => `${goldToPay} 골드가 부족합니다`,
  weekDay: ["일", "월", "화", "수", "목", "금", "토"],
  needTicket: "티켓이 없습니다",
}

export default translation;