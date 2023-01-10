function filterRange(arr, a, b) {
  let ar = arr.filter(i => (a <= i && i <= b))
  return ar
}
