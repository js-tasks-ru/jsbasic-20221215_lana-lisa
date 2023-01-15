function makeDiagonalRed(table) {
  for (let i = 0; i < table.rows.length; i++) {
    let redRows = table.rows[i].cells[i]
    redRows.style.backgroundColor = 'red'
  }
}
