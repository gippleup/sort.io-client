type DayDescriptor = {
  [index in 0 | 1 | 2 | 3 | 4 | 5 | 6]: string;
}

export const prettyTime = (time: string, format?: string, dayDescriptor?: DayDescriptor) => {
  const date = new Date(time);
  const split = {
    year: String(date.getFullYear()),
    month: String(date.getMonth() + 1),
    day: date.getDay(),
    date: String(date.getDate()),
    hours: String(date.getHours()),
    minutes: String(date.getMinutes()),
    seconds: String(date.getSeconds()),
  };

  if (format) {
    const formatted = format
      .replace("$YYYY", split.year)
      .replace("$MM", split.month)
      .replace("$DD", split.date)
      .replace("$dd", dayDescriptor ? dayDescriptor[split.day as 0 | 1 | 2 | 3 | 4 | 5 | 6] : String(split.day))
      .replace("$hh", split.hours)
      .replace("$mm", split.minutes)
      .replace("$ss", split.seconds)
    return formatted;
  }

  return date.toDateString();
}
