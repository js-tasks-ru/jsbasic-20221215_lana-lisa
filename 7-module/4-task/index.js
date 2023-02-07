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
    
    let thumb = this.elem.querySelector('.slider__thumb')
    let progress = this.elem.querySelector('.slider__progress')
    let sliderSteps = this.elem.querySelector('.slider__steps')

    for (let i = 0; i < this.config.steps; i++) {
      let span = document.createElement('span')
      span.id = i
      this.elem.querySelector('.slider__steps').appendChild(span)
    }

    sliderSteps.firstElementChild.classList.add("slider__step-active")

    thumb.addEventListener('pointerdown', event => {
      let shift = event.clientX - this.elem.getBoundingClientRect().left
      console.log('shift', shift)

      let onMouseMove = event => {
        this.elem.classList.add('slider_dragging')
        let shift = event.clientX - this.elem.getBoundingClientRect().left
        let leftRelative = shift / this.elem.offsetWidth

        if (leftRelative < 0) {
          leftRelative = 0;
        }
        if (leftRelative > 1) {
          leftRelative = 1;
        }

        let segments = this.config.steps - 1
        let approximateValue = leftRelative * segments
        let value = Math.round(approximateValue)
        
        thumb.querySelector('.slider__value').innerHTML = value 

        let activeStep = sliderSteps.querySelector('.slider__step-active')
        if (activeStep) {
          activeStep.classList.remove('slider__step-active')
        }

        document.getElementById(value).classList.add('slider__step-active')
        let leftPercents = leftRelative * 100
        let leftPercents2 = value / segments * 100
        console.log(leftPercents2)
        thumb.style.left = `${leftPercents}%`
        progress.style.width = `${leftPercents}%`
        

        this.elem.dispatchEvent(new CustomEvent('slider-change', {
          detail: console.log(value) || value,
          bubbles: true 
        }))
      }

      document.addEventListener('pointermove', onMouseMove)

      document.addEventListener('pointerup', () => {
        this.elem.classList.remove('.slider_dragging')
        document.removeEventListener('pointermove', onMouseMove)
      })

    })

    thumb.ondragstart = () => false;
  }
}
