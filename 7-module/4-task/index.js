import createElement from "../../assets/lib/create-element.js"

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.config = {steps, value}
    this.steps = steps
    this.segments = steps - 1
    this.elem = createElement (
      `
      <div class="slider">

        <div class="slider__thumb">
          <span class="slider__value">0</span>
        </div>

        <div class="slider__progress" style="width: 0%;"></div>

        <div class="slider__steps">
        </div>
      </div>
      `
    )
    this.addEventListeners()
    this.setValue(value)
  }


  setValue(value) {
    this.value = value;

    let valuePercents = (value / this.segments) * 100;

    this.elem.querySelector('.slider__thumb').style.left = `${valuePercents}%`;
    this.elem.querySelector('.slider__progress').style.width = `${valuePercents}%`;

    this.elem.querySelector('.slider__value').innerHTML = value;

    if (this.elem.querySelector('.slider__step-active')) {
      this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active');
    }

    this.elem.querySelector('.slider__steps').children[this.value].classList.add('slider__step-active');
  }

  addEventListeners() {
    this.elem.onclick = this.onClick;
    
    let thumb = this.elem.querySelector('.slider__thumb')
    let sliderSteps = this.elem.querySelector('.slider__steps')

    for (let i = 0; i < this.config.steps; i++) {
      let span = document.createElement('span')
      span.id = i
      this.elem.querySelector('.slider__steps').appendChild(span)
    }

    sliderSteps.firstElementChild.classList.add("slider__step-active")

    thumb.addEventListener('pointerdown', event => {
      event.preventDefault()

      this.elem.classList.add('slider_dragging')

      document.addEventListener('pointermove', this.onPointerMove)
      document.addEventListener('pointerup', this.onPointerUp)
    })

    thumb.ondragstart = () => false;
  }

  onPointerMove = event => {
    event.preventDefault()
    
    let shift = event.clientX - this.elem.getBoundingClientRect().left
    let newLeft = shift / this.elem.offsetWidth

    if (newLeft < 0) {newLeft = 0}
    if (newLeft > 1) {newLeft = 1}

    this.elem.querySelector('.slider__thumb').style.left = `${newLeft * 100}%`
    this.elem.querySelector('.slider__progress').style.width = `${newLeft * 100}%`

    this.value = Math.round(newLeft * this.segments)
    this.elem.querySelector('.slider__value').innerHTML = this.value 

    let sliderSteps = this.elem.querySelector('.slider__steps')
    let activeStep = sliderSteps.querySelector('.slider__step-active')
    if (activeStep) {
      activeStep.classList.remove('slider__step-active')
    }

    document.getElementById(this.value).classList.add('slider__step-active')
    
  }

  onPointerUp = () => {
    document.removeEventListener('pointermove', this.onPointerMove)
    document.removeEventListener('pointerup', this.onPointerUp)
    
    this.elem.classList.remove('.slider_dragging')
    
    this.elem.querySelector('.slider__thumb').style.left = `${(this.value/this.segments) * 100}%`
    this.elem.querySelector('.slider__progress').style.width = `${(this.value/this.segments) * 100}%`
  
    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true 
    })
  )
}

onClick = event => {
  let newLeft = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;

  this.setValue(Math.round(this.segments * newLeft));

  this.elem.dispatchEvent(
    new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    })
  );
}
}
