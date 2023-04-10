import AbstractView from '../framework/view/abstract-view.js';

const createShowMoreButtonTemplate = () => (`
  <button class="btn-round btn-round--to-top btn-round--size-small catalogue__to-top-btn" type="button" aria-label="наверх">
    <svg width="80" height="85" aria-hidden="true" focusable="false">
      <use xlink:href="#icon-round-button"></use>
    </svg>
  </button>`
);

export default class ShowMoreButtonView extends AbstractView {
  #handleClick = null;

  constructor({onClick}) {
    super();
    this.#handleClick = onClick;

    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createShowMoreButtonTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
