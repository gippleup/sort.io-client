type ConvertPlayCountTextParameter = {
  win: number | string;
  lose: number | string;
  total: number | string;
  draw: number | string;
}

export const convertToPlayCountText = (option: ConvertPlayCountTextParameter) => {
  const {draw, lose, total, win} = option;
  return `${total}전 ${win}승 ${lose}패 ${draw}무`;
}