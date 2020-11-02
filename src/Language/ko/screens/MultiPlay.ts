const translation = {
  waitingOpponent: "상대방을\n기다리고\n있습니다",
  withdrawal: "기권",
  withdrawalDesc: "지금 종료하면 패배 처리됩니다. 기권하시겠습니까?",
  yes: "예",
  no: "아니요",
  opponentLeft: "상대방이 나갔습니다",
  score: "전적",
  winningRate: "승률",
  rankText: (rank: number, total: number) => {
    return `${total}명 중 ${rank}위`;
  },
  top: "상위",
  rematch: "재대결",
  anotherMatch: "다른 상대 찾기",
  home: "홈",
  scoreText: (win: number, lose: number, draw: number) => {
    const total = win + lose + draw;
    return `${total}전 ${win}승 ${lose}패 ${draw}무`;
  },
  point: "점",
  requestRematchText: (userName: string) => `${userName}은(는) 재대결을 요청했다!`,
  declineRematchText: (userName: string) => `${userName}이(가) 재대결을 거부했다!`,
  acceptRematchText: (userName: string) => `${userName}이(가) 재대결을 수락했다!`,
  cancelRematchText: (userName: string) => `${userName}이(가) 재대결을 철회했다!`,
  accept: "수락",
  decline: "거절",
  cancel: "취소",
  buildingBlockMap: "새로운 블록 맵을 만들고 있습니다",
  rematchStartSoon: "재대결을 곧 시작합니다!"
}

export default translation;