import createElement from "../../assets/lib/create-element.js"

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.config = {steps, value}
    this.elem = createElement (
      `
      <div class="slider">

        <div class="slider__thumb">
          <span class="slider__value">0</span>
        </div>

        <div class="slider__progress" style="width: 0%;"></div>

        <div class="slider__steps">
          <span class="slider__step-active"></span>
        </div>
      </div>
      `
    )
    this.addEventListeners()
  }


  addEventListeners() {
    
    for (let i = 0; i < this.config.steps - 1; i++) {
      let span = document.createElement('span')
      span.id = i
      this.elem.querySelector('.slider__steps').appendChild(span)
    }


    this.elem.addEventListener('click', event => {
      let thumb = this.elem.querySelector('.slider__thumb')
      let progress = this.elem.querySelector('.slider__progress')
      let sliderSteps = this.elem.querySelector('.slider__steps')
      
      let x = event.clientX
      let left = this.elem.getBoundingClientRect().left
      let shift = x - left
      let leftRelative = shift / this.elem.offsetWidth
      let value = Math.round(leftRelative * 4)

      this.elem.querySelector('.slider__value').innerHTML = value 
      document.getElementById(value-1).classList.add('slider__step-active')
      let leftPercents = 25 * value
      thumb.style.left = `${leftPercents}%`
      progress.style.width = `${leftPercents}%`
      
      let activeStep = sliderSteps.querySelector('.slider__step-active')
      if (activeStep) {
        activeStep.classList.remove('slider__step-active')
      }

      this.elem.dispatchEvent(new CustomEvent('slider-change', {
        detail: console.log(value) || value,
        bubbles: true 
      }))
    })
  }

}
