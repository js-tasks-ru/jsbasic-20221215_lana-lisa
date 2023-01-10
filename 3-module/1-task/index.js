function namify(users) {
  let res = []
  for (let i of users) {
    res.push(i.name)
  }
  return res;
}