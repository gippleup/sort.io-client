export function randomIndexFromArray<T>(array: T[]): number {
  const randomValidIndex = Math.floor(Math.random() * array.length);
  return randomValidIndex;
}

export function pickRandomFromArray<T>(array: T[]) {
  return array[randomIndexFromArray(array)];
}

export function extractRandomFromArray<T> (array: T[]) {
  const randomIndex = randomIndexFromArray(array);
  const pickedEle = array[randomIndex];
  const front = array.slice(0, randomIndex);
  const latter = array.slice(randomIndex + 1, array.length);
  const extractedArray = front.concat(latter)
  return {
    pickedEle,
    extractedArray,
  };
}
