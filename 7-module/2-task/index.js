import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = createElement (
      `
      <div class="modal">
        <div class="modal__overlay"></div>

        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>

            <h3 class="modal__title">
            </h3>
          </div>

          <div class="modal__body">
          </div>
        </div>
      </div>
      `
    )
    this.close()
  }

  open() {
    document.body.append(this.elem)
    document.body.classList.add('is-modal-open')
  }

  setTitle(title) {
    this.elem.querySelector('.modal__title').innerHTML=title
  }

  setBody(node) {
    this.elem.querySelector('.modal__body').append(node)
  }

  close() {

    document.body.lastChild.remove()
    document.body.classList.remove('is-modal-open')
    

    let modalClose = this.elem.querySelector('.modal__close')
    modalClose.addEventListener('click', function() {
      console.log('close')
      document.body.lastChild.remove()
      document.body.classList.remove('is-modal-open')
    })


    let listener = function(event) {
      if (event.code === 'Escape') {
        console.log('1')
        document.body.lastChild.remove()
        document.body.classList.remove('is-modal-open')
        document.removeEventListener('keydown', listener)
      }}

    document.addEventListener('keydown', listener)
  }
}
