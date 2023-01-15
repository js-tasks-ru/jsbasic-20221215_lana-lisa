function getMinMax(str) {
  let res = str
  .split(' ')
  .filter(i => +i)
  return {min: Math.min(...res), max: Math.max(...res)}
}
