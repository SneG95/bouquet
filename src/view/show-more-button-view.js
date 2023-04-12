import AbstractView from '../framework/view/abstract-view.js';

const createShowMoreButtonTemplate = () => '<button class="btn btn--outlined catalogue__show-more-btn" type="button">больше букетов</button>';

export default class ShowMoreButtonView extends AbstractView {
  #handleClick = null;
  #isEmpty = false;

  constructor({onClick, isEmpty}) {
    super();
    this.#handleClick = onClick;
    this.#isEmpty = isEmpty;

    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createShowMoreButtonTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    if (!this.#isEmpty) {
      this.#handleClick();
    }
  };
}
