function hideSelf() {
  let elem = document.querySelector(".hide-self-button")
  elem.addEventListener('click', 
  function () {
    elem.hidden = true
  })
}
