function initCarousel() {
  let caruselInner = document.querySelector('.carousel__inner')
  let caruselSlide = document.querySelectorAll('.carousel__slide')
  let arrowRight = document.querySelector('.carousel__arrow_right')
  let arrowLeft = document.querySelector('.carousel__arrow_left')
  arrowLeft.style.display = 'none'
  
  let counter = 0
  let slideWidth = caruselSlide[0].offsetWidth 
 
  arrowRight.addEventListener('click', function () {
    counter ++
    arrowLeft.style.display = ''
    caruselInner.style.transform = 'translateX(-' + slideWidth * counter + 'px)'
    if (counter === caruselSlide.length - 1) {
          arrowRight.style.display = 'none'
        }
  })

  arrowLeft.addEventListener('click', function () {
    counter --
    caruselInner.style.transform = 'translateX(-' + slideWidth * counter + 'px)'
    if (counter > 0) {
      arrowLeft.style.display = ''
      arrowRight.style.display = ''
    } else {
      arrowLeft.style.display = 'none'
    }
  })

}
