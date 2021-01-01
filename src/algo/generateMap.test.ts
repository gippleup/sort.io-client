import { generateOptionByLevel } from '@screens/production/GameScreen/utils';
import generateMap from './generateMap';


test("1000 map should be able to be generated within 1sec", () => {
  const option = generateOptionByLevel(60);
  const start = Date.now();
  for (let i = 0; i < 1000; i += 1) {
    generateMap(option.map);
  }
  const end = Date.now();
  const timeTook = end - start;
  expect(timeTook).toBeLessThan(1000);
})