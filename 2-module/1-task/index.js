function sumSalary(salaries) {
  let res = 0;
  for (let key of Object.values(salaries)) {
    if (isFinite(key)) {
      res += key
    }
  }
  return res
}
