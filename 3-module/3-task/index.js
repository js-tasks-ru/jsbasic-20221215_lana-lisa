function camelize(str) {
  let s = str.split('-').map((s, i) => i != 0 ? (s[0].toUpperCase() + s.slice(1)) : s)
  let j = s.join("")
  return j
}
