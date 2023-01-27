/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */


import createElement from '../../assets/lib/create-element.js'

export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.addEventListeners()
  }
  

  addEventListeners() { 
    this.elem = createElement (`
    <table>
        <thead>
            <tr>
                <th>Имя</th>
                <th>Возраст</th>
                <th>Зарплата</th>
                <th>Город</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
        ${this.rows.map(i =>
          `
          <tr>
            <td>${i.name}</td>
            <td>${i.age}</td>
            <td>${i.salary}</td>
            <td>${i.city}</td>
            <td><button>X</button></td>
            </tr>
            `
          ).join('')}
        </tbody>
    </table>
    `)
    for (let btn of this.elem.querySelectorAll('button')) {
      btn.addEventListener('click',  (event)=>  {
        event.target.closest('tr').remove()
      })
    }
    return this.elem
  } 
  
}
