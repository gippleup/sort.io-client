export const randomIndexFromArray = (array: any[]): number => {
  const randomValidIndex = Math.floor(Math.random() * array.length);
  return randomValidIndex;
}

export const pickRandomFromArray = (array: any[]) => {
  return array[randomIndexFromArray(array)];
}

export const extractRandomFromArray = (array: any[]) => {
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
