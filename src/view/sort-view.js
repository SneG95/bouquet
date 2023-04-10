import AbstractView from '../framework/view/abstract-view';
import { SortType, SortTypeDescription } from '../consts';

const createSortItemTemplate = (sortItem, isChecked) => (`
  <a
    class="sorting-price__link ${sortItem === SortType.INCREASE ? 'sorting-price__link--incr' : ''} ${isChecked ? 'sorting-price__link--active' : ''}"
    href="#"
    aria-label="${sortItem === SortType.INCREASE ? SortTypeDescription.INCREASE : SortTypeDescription.DESCENDING}">
    <svg class="sorting-price__icon" width="50" height="46" aria-hidden="true" data-sort-type="${sortItem}">
      <use xlink:href="#icon-${sortItem}-sort" data-sort-type="${sortItem}"></use>
    </svg>
  </a>`
);

const createSortTemplate = (currentSortType) => {
  const sortItemsTemplate = Object.entries(SortType).map((item) => item[1])
    .map((sortItem) => createSortItemTemplate(sortItem, currentSortType === sortItem))
    .join('');

  return(`
    <div class="catalogue__sorting">
      <div class="sorting-price">
        <h3 class="title sorting-price__title">Цена</h3>

        ${sortItemsTemplate}

      </div>
    </div>`
  );
};

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#currentSortType = currentSortType;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'svg' && evt.target.tagName !== 'use') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
