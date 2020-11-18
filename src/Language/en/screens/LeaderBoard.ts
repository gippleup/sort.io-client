import { ScreenTranslation } from "../../translation";

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
}

export default translation;