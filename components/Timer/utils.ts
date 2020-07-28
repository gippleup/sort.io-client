function prettyTime(time: number, roundOn: number = 2) {
  const roundedTime = Math.round(time * Math.pow(10, roundOn)) / Math.pow(10, roundOn);
  const flattenedTime = String(Math.round(roundedTime * Math.pow(10, roundOn)));
  const integer = flattenedTime.slice(0, flattenedTime.length - roundOn) || '0';
  const decimal = flattenedTime.slice(
    flattenedTime.length - roundOn,
    flattenedTime.length,
  );
  return {
    integer,
    decimal,
  };
}

function disectFontLayout(fontSize: number) {
  const layout = {
    totalHeight: fontSize * 1.335,
    _paddingBottom: fontSize * (10.5 / 40),
    _textHeight: fontSize * (29 / 40),
    _paddingTop:
      fontSize * 1.335 - (fontSize * 10.5) / 40 - (fontSize * 29) / 40,
  };
  return layout;
}

export default {
  prettyTime,
  disectFontLayout,
};
