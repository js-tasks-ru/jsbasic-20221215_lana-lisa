import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.addEventListeners()
  }

  addEventListeners() {
    this.elem = createElement (
      `
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left ">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner">
        ${this.categories.map(i => 
          `
          <a href="#" class="ribbon__item" data-id=${i.id}>${i.name}</a>
          `)}
        </nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
      `
    )

    
    this.elem.onclick = ({target}) => {
      let btn1 = target.closest('.ribbon__arrow_right')
      let btn2 = target.closest('.ribbon__arrow_left')
      let btnLeft = this.elem.querySelector('.ribbon__arrow_left')
      let btnRight = this.elem.querySelector('.ribbon__arrow_right')
      let ribbonInner = this.elem.querySelector('.ribbon__inner')
      let scrollLeft = ribbonInner.scrollLeft
      let scrollWidth = ribbonInner.scrollWidth
      let clientWidth = ribbonInner.clientWidth
      let scrollRight = scrollWidth - scrollLeft - clientWidth

      if (btn1) {
        btnLeft.classList.add('ribbon__arrow_visible')
        ribbonInner.scrollBy(350, 0)
        if (scrollRight < 1) {
          btnRight.classList.remove('ribbon__arrow_visible')
        }
      }

      if (btn2) {
        btnRight.classList.add('ribbon__arrow_visible')
        ribbonInner.scrollBy(-350, 0)
        if (scrollLeft < 1) {
          btnLeft.classList.remove('ribbon__arrow_visible')
        } 
      }
    }

    let ribbonInner = this.elem.querySelector('.ribbon__inner')
    
    ribbonInner.onclick = (event) => {
      let id = event.target.closest(".ribbon__item").dataset.id
      console.log(id)
      let ribbonItem = event.target.closest('.ribbon__item')

      let activeItem = ribbonInner.querySelector('.ribbon__item_active');
      if (activeItem) {
        activeItem.classList.remove('ribbon__item_active');
      }
     
      ribbonItem.classList.add('ribbon__item_active')
      event.preventDefault()
      
      this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
        detail: id,
        bubbles: true
      }))
      
    }
  }
}
