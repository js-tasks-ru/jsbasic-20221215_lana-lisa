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
        </div>
      </div>
      `
    )
    this.addEventListeners()
  }


  addEventListeners() {

    let sliderSteps = this.elem.querySelector('.slider__steps')

    for (let i = 0; i < this.config.steps; i++) {
      let span = document.createElement('span')
      span.id = i
      sliderSteps.appendChild(span)
    }

    sliderSteps.firstElementChild.classList.add("slider__step-active")

    this.elem.addEventListener('click', event => {
      let thumb = this.elem.querySelector('.slider__thumb')
      let progress = this.elem.querySelector('.slider__progress')
      
      let x = event.clientX
      let left = this.elem.getBoundingClientRect().left
      let shift = x - left
      let leftRelative = shift / this.elem.offsetWidth
      let segments = this.config.steps - 1
      let approximateValue = leftRelative * segments
      let value = Math.round(approximateValue)

      let activeStep = sliderSteps.querySelector('.slider__step-active')
      if (activeStep) {
        activeStep.classList.remove('slider__step-active')
      }

      this.elem.querySelector('.slider__value').innerHTML = value 
      document.getElementById(value).classList.add('slider__step-active')
      let leftPercents = value / segments * 100
      console.log(leftPercents)
      thumb.style.left = `${leftPercents}%`
      progress.style.width = `${leftPercents}%`
      
      
      this.elem.dispatchEvent(new CustomEvent('slider-change', {
        detail: console.log(value) || value,
        bubbles: true 
      }))
    })
  }

}
