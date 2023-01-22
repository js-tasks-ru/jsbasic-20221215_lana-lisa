function toggleText() {
  let btn = document.querySelector('.toggle-text-button')
  btn.addEventListener('click', function() {
    let elem = document.getElementById('text');
    elem.hidden = !elem.hidden;
  })
}
