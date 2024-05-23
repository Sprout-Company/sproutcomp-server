
export const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const randomItem = (arr) => {
  return arr[randomInt(0, arr.length - 1)];
}