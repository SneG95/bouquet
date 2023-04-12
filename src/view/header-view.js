import AbstractView from '../framework/view/abstract-view.js';

const createHeaderTemplate = (cart) => {
  const productCount = 0;
  const sum = 0;
  return(`
  <div class="header__container">
    <div class="header-count">
      <button class="header-count__btn" type="button">
        <svg width="60" height="47" aria-hidden="true">
          <use xlink:href="#icon-heart-header"></use>
        </svg>
        <span class="visually-hidden">закрыть</span>
      </button>
      <div class="header-count__count">
        <p class="text text--size-20 header-count__counter">${cart.productCount ? cart.productCount : productCount}</p>
      </div>
      <div class="header-count__block">
        <p class="text text--size-20 header-count__text">сумма</p>
        <b class="price price--size-min header-count__price">
          ${cart.sum ? cart.sum : sum}
          <span>Р</span>
        </b>
      </div>
    </div>
  </div>`
  );
};

export default class HeaderView extends AbstractView {
  #cart = null;
  #handleClick = null;

  constructor({cart, onClick}) {
    super();
    this.#cart = cart;
    this.#handleClick = onClick;

    this.element.querySelector('button')
      .addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createHeaderTemplate(this.#cart);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
