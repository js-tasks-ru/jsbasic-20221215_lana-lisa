function makeFriendsList(friends) {
  let newUl = document.createElement('ul')
  for (let i of friends) {
    let newLi = document.createElement('li')
    newLi.innerHTML = `${i.firstName} ${i.lastName}`
    newUl.append(newLi)
  }
  return newUl
}