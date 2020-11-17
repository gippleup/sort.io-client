import * as d3 from "d3";

export const drawSvgLine = (data: {x: number, y: number}[]): string => {
  if (!data.length) {
    return '';
  }
  const yMax = data.map((entry) => entry.y).reduce((acc, ele) => acc < ele ? ele : acc);

  const drawLine = d3.line()
    .curve(d3.curveCardinal)
    .x(d => d[0])
    .y(d => yMax - d[1]);

  const xyArr = data.map((coordinate) => Object.values(coordinate)) as [number, number][];
  return drawLine(xyArr) || '';
}