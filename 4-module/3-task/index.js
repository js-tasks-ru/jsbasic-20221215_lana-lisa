function highlight(table) {
  let tbody = table.children[1]
  for (let i = 0; i < tbody.rows.length; i++) {
    let row = tbody.rows[i]
    let age = row.cells[1]
    let gender = row.cells[2]
    let status = row.cells[3]

    let { available } = status.dataset

    available ==='true' ? row.classList.add("available") : 
        (available ==='false') ? row.classList.add("unavailable") : 
        row.hidden = true

    gender.textContent === 'm' ? row.classList.add('male') : 
      row.classList.add('female')

    if (age.textContent < 18) {
      row.style="text-decoration: line-through"
    }
  }
}
