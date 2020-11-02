import { ScreenTranslation } from "../../translation";

const translation: ScreenTranslation["MultiPlay"] = {
  waitingOpponent: "Waiting\nOpponent",
  withdrawal: "Withdrawal",
  withdrawalDesc: "If you exit now,\na defeat will be recorded.\nDo you still want to exit?",
  yes: "Yes",
  no: "No",
  opponentLeft: "Opponent has left",
  score: "Scores",
  winningRate: "Rate",
  rankText: (rank: number, total: number) => {
    return `${rank} / ${total}`;
  },
  top: "Top",
  rematch: "Rematch",
  anotherMatch: "Find Other",
  home: "Home",
  scoreText: (win: number, lose: number, draw: number) => {
    const total = win + lose + draw;
    return `${win}W ${lose}L ${draw}D`;
  },
  point: "Point",
  requestRematchText: (userName: string) => `${userName} Requested Rematch!`,
  declineRematchText: (userName: string) => `${userName} Declined!`,
  acceptRematchText: (userName: string) => `${userName} Accepted!`,
  cancelRematchText: (userName: string) => `${userName} Cancelled!`,
  accept: "Accept",
  decline: "Decline",
  cancel: "Cancel",
  buildingBlockMap: "Building New Blocks",
  rematchStartSoon: "Rematch Start Soon!"
}

export default translation;