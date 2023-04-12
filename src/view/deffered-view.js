import AbstractView from '../framework/view/abstract-view.js';

const createDefferedTemplate = (cart) => {
  const productCount = 0;
  const sum = 0;

  return (`
  <section class="popup-deferred" style="display:block;">
    <div class="popup-deferred__wrapper">
      <div class="popup-deferred__container">
        <a class="btn btn--with-icon popup-deferred__btn btn--light" href="#">в&nbsp;каталог
          <svg width="61" height="24" aria-hidden="true">
            <use xlink:href="#icon-arrow"></use>
          </svg>
        </a>
        <ul class="popup-deferred__catalog"></ul>
        <div class="popup-deferred__btn-container">
          <button class="btn btn--with-icon popup-deferred__btn-clean" type="button">очистить
            <svg width="61" height="24" aria-hidden="true">
              <use xlink:href="#icon-arrow"></use>
            </svg>
          </button>
        </div>
        <div class="popup-deferred__sum">
          <p class="text text--total">Итого вы выбрали:</p>
          <div class="popup-deferred__block-wrap">
            <div class="popup-deferred__block">
              <p class="text text--total">Букеты</p><span class="popup-deferred__count" data-atribut="count-defer">${cart.productCount ? cart.productCount : productCount}</span>
            </div>
            <div class="popup-deferred__block">
              <p class="text text--total">Сумма</p><b class="price price--size-middle-p">${cart.sum ? cart.sum : sum}<span>Р</span></b>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`
  );
};

export default class DefferedView extends AbstractView {
  #handleClick = null;
  #cart = null;

  constructor({onClick, cart}) {
    super();
    this.#handleClick = onClick;
    this.#cart = cart;

    this.element.querySelector('a')
      .addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createDefferedTemplate(this.#cart);
  }

  get popupDefferedContainer() {
    return this.element.querySelector('.popup-deferred__wrapper');
  }

  get flowersContainer() {
    return this.element.querySelector('ul');
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName === 'svg' || evt.target.tagName === 'A') {
      this.#handleClick();
    }
  };

}
