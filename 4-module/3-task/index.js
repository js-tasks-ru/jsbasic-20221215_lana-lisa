function highlight(table) {
  let tbody = table.children[1]
  for (let i = 0; i < tbody.rows.length; i++) {
    let row = tbody.rows[i]
    let age = row.cells[1]
    let gender = row.cells[2]
    let status = row.cells[3]

    if (status.hasAttribute('data-available')) {
      if (status.dataset.available ==='true') {
        row.classList.add("available")
      } else if (status.dataset.available ==='false') {
        row.classList.add("unavailable")
      }
    }

    if (!status.dataset.available) {
      row.hidden = true
    }

    if (gender.textContent === 'm') {
      row.classList.add('male')
    } else if (gender.textContent === 'f') {
      row.classList.add('female')
    }

    if (age.textContent < 18) {
      row.style="text-decoration: line-through"
    }
  }
}
