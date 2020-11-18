const translation = {
  singlePlay: "싱글게임",
  multiPlay: "멀티게임",
  goToMain: "메인으로",
  top: "상위",
  rankText: (rank: number) => `${rank}위`,
  hour: "시간",
  day: "일",
  all: "전체",
  recent: "최근",
  place: "랭킹",
  percentile: "백분율",
  rankTrend: "랭크 변화 추이",
  noRecord: "아직 기록이 없어요!",
  winningRate: "승률",
  score: "전적",
  scoreText: (win: number, lose: number, draw: number) => {
    const total = win + lose + draw;
    return `${total}전 ${win}승 ${lose}패 ${draw}무`;
  },
  point: "점",
  matchCount: "승부 수",
}

export default translation;