import { ScreenTranslation } from "../../translation";

const translation: ScreenTranslation["SelectStage"] = {
  navTitle: "Single Play",
  currentRank: "Current Rank",
  rankChangeProgess: "Rank Changes",
  loadingData: "Loading Data",
  notEnoughData: "Not Enough Data",
  close: "Close",
  singlePlayPerformance: "Rank Report",
  checkConnection: "Check Connection",
  noPlayData: "No Play Data",
  recentUpdate: "Recent Update",
  noData: "Hmm, there's no record.",
  name: "Name",
  lastClearDifficulty: "Last Cleared Difficulty",
  rank: "Rank",
  rankText: (rank: number) => {
    const tail = (() => {
      if (rank % 10 === 1) return 'st';
      if (rank % 10 === 2) return 'nd';
      if (rank % 10 === 3) return 'rd';
      return 'th';
    })();
    return rank + tail;
  },
  top: "Top",
  percentile: "Percentile",
  ticketPurchase: "Purchase Ticket",
  purchaseQuantity: "Quantity",
  purchase: "Purchase",
  cancel: "Cancel",
  challenge: "Challenge",
  rankToChallenge: "Rank to Challenge",
  challengeDes: "Use a ticket, and challenge higher rank.",
  challengeReward: "Challenge Reward",
  challengeRewardDes: ":10G + 10G * (0 + ...Winning Streak) * 2",
  challengeRewardEx1: "ex) 1WS: 10G + 10G(0 + 1) * 2 = 30G",
  challengeRewardEx2: "ex) 2WS: 10G + 10G(0 + 1 + 2) * 2 = 70G",
  challengeRewardEx3: "ex) 3WS: 10G + 10G(0 + 1 + 2 + 3) * 2 = 130G",
  rewardTotal: "Total for 3 Winning: 230G",
  start: "Start",
  practice: "Practice",
  rankToPractice: "Rank to Practice",
  practiceDes: "Train and get golds",
  practiceReward: "Practice Reward",
  practiceRewardDes: ":10G + 10G * (0 + ...Winning Streak)",
  practiceRewardEx1: "ex) 1WS: 10G + 10G(0 + 1) = 20G",
  practiceRewardEx2: "ex) 2WS: 10G + 10G(0 + 1 + 2) = 40G",
  practiceRewardEx3: "ex) 3WS: 10G + 10G(0 + 1 + 2 + 3) = 70G",
  practiceRewardTotal: "Total for 3 winning: 130G",
  adAdvert: "Ad appears one time in ten.",
  cantLoadAd: "Ads depleted",
  loadingAd: "Loading Ad",
  getGold: "G (GET)",
  notEnoughGold: "Not Enough Gold",
  requiredGold: "Required",
  havingGold: "Stored",
  notEnoughGoldMessage: (goldToPay: number) => `You need ${goldToPay} Gold`,
  weekDay: ["SUN", "MON", "TUE", "WED", "THURS", "FRI", "SAT"],
  needTicket: "Need Ticket"
}

export default translation;