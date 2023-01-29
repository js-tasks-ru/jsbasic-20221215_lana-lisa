import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.addEventListeners()
  }

  addEventListeners() {
    this.elem = createElement (
      `
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${this.slides.map (i =>
          `
          <div class="carousel__slide" data-id=${i.id}>
            <img src="/assets/images/carousel/${i.image}" class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${i.price.toFixed(2)}</span>
              <div class="carousel__title">${i.name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
            </div>
          </div>
          `).join('')}
        </div>
      </div>
      `
    )

    let addProduct;
    for (let slide of this.elem.querySelectorAll('.carousel__slide')) {
    addProduct = new CustomEvent('product-add', {
      detail: console.log(slide.dataset.id) || slide.dataset.id,
      bubbles: true
    })
    }
  
    for (let btn of this.elem.querySelectorAll('.carousel__button')) {
      btn.addEventListener('click', () => {
        btn.dispatchEvent(addProduct)
      })

      btn.addEventListener('product-add', (event) => {
        console.log(event.detail)
      })
    }
  
  

    let caruselInner = this.elem.querySelector('.carousel__inner')
    let caruselSlide = this.elem.querySelectorAll('.carousel__slide')
    let arrowRight = this.elem.querySelector('.carousel__arrow_right')
    let arrowLeft = this.elem.querySelector('.carousel__arrow_left')
    arrowLeft.style.display = 'none'
  
    let counter = 0

    arrowRight.addEventListener('click', function () {
      let slideWidth = caruselSlide[0].offsetWidth
      counter ++
      arrowLeft.style.display = ''
      caruselInner.style.transform = 'translateX(-' + slideWidth * counter + 'px)'
      if (counter === caruselSlide.length - 1) {
            arrowRight.style.display = 'none'
          }
    })

    arrowLeft.addEventListener('click', function() {
      let slideWidth = caruselSlide[0].offsetWidth
      counter --
      arrowRight.style.display= ''
      caruselInner.style.transform = 'translateX(-' + slideWidth * counter + 'px)'
      if (counter === 0) {
        arrowLeft.style.display = 'none'
      }
    })
  }
}
