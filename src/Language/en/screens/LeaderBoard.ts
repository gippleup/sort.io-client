import { ScreenTranslation } from "@Language/translation";

const translation: ScreenTranslation["LeaderBoard"] = {
  singlePlay: "Single Play",
  multiPlay: "Multi Play",
  goToMain: "Main",
  rankText: (rank: number) => {
    const tail = (() => {
      if (rank === 1) return "st";
      if (rank === 2) return "nd";
      if (rank === 3) return "rd";
      return "th";
    })();
    return `${rank}${tail}`
  },
  top: "Top",
  all: "All",
  day: "Day",
  hour: "Hour",
  recent: "Recent",
  place: "Place",
  percentile: "Percentile",
  rankTrend: "Rank Trend",
  noRecord: "No Record, Yet!",
  winningRate: "Win Rate",
  score: "Score",
  scoreText: (win: number, lose: number, draw: number) => {
    const total = win + lose + draw;
    return `${win}W ${lose}L ${draw}D`;
  },
  point: "Point",
  matchCount: "Match Count",
}

export default translation;