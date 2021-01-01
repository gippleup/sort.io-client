import { generateMap } from "./generateMap";
import { generateOptionByLevel } from "@screens/production/GameScreen/utils";
import BoardSolver from "./BoardSolver";

// const exampleOption = generateOptionByLevel(50);
// const exampleMap = generateMap(exampleOption.map).question;
const exampleMap = [
  [ 9,  2, 4, 3, 4, 11, 7 ],
  [ 10, 13, 2, 4, 1, 6 ],
  [ 4, 12, 5, 3, 16, 2 ],
  [ 11, 2, 9, 12, 5 ],
  [ 11, 3, 0, 13, 15, 4 ],
  [ 4,  4, 17,  7, 11, 10, 17, 17 ],
  [ 14,  4,  2, 16, 17, 10, 11 ],
  [ 1, 0, 11, 5, 4, 3, 15 ],
  [ 15, 0,  2, 12,11, 4, 16 ],
  [ 8,  7, 4, 11,10, 15, 3 ],
  [ 9,  1,  8, 16,10, 14, 11 ],
  [ 9, 3, 4, 16,16, 6, 5 ],
  [ 2, 15, 6, 9,12,  0, 8, 4 ],
  [ 15, 10, 9, 15,10,  8, 8 ],
  [ 11, 10, 15, 1, 6, 13 ],
  [ 9, 14, 6, 4, 10, 2 ],
  [ 2, 6, 8, 3, 9, 10 ],
  [ 17, 12, 5, 0, 3, 4 ],
  [ 4,  9, 11, 14,15, 17,  7 ],
  [ 10,  9, 2, 1,15, 11, 4 ],
  [ 10, 12, 0, 9, 7, 6 ],
  [ 15,  3, 10, 1, 5, 13, -1 ],
  [ 4, 3, 7, 9, 14, 15 ],
  [ 17, 15, 11, 13, 3 ],
  [ 3, 7, 16, 2, 0, 9 ],
  [ -1, -1, -1, -1,-1, -1, -1 ],
  [ 11, 4, 14, 5, 6 ]
]

test("Solver can move blocks from stack to stack", () => {
  const solver = new BoardSolver(exampleMap);
  
})