import AbstractView from '../framework/view/abstract-view.js';
import { getFilterValue } from '../utils.js';

const createReasonItemTemplate = (filter, currentFilterType, index) => {
  const {name, description} = filter;
  return (`
  <div class="filter-field-text filter-reason__form-field--for-${name} filter-reason__form-field">
    <input
      class="filter-field-text__input filter-reason__form-field--for-${name} filter-reason__form-field"
      type="radio"
      id="filter-reason-field-id-${index}"
      name="reason"
      value="for-${name}"
      ${currentFilterType === name ? 'checked' : ''}>
    <label class="filter-field-text__label" for="filter-reason-field-id-${index}"><span class="filter-field-text__text">${description}</span></label>
  </div>`
  );
};

const createFilterTemplate = (reasonFilters, currentReasonFilter) => {
  const filterReasonsTemplate = reasonFilters.map((filter, index) => createReasonItemTemplate(filter, currentReasonFilter, index)).join('');

  return(`
    <section class="filter-reason">
      <div class="container">
        <h2 class="title title--h3 filter-reason__title">Выберите повод для букета</h2>
        <form class="filter-reason__form" action="#" method="post">
          <div class="filter-reason__form-fields">

            ${filterReasonsTemplate}

          </div>
          <button class="filter-reason__btn visually-hidden" type="submit" tabindex="-1">применить фильтр</button>
        </form>
      </div>
    </section>`
  );
};

export default class FilterReasonView extends AbstractView {
  #reasonFilters = null;
  #currentReasonFilter = null;
  #handleFilterReasonTypeChange = null;

  constructor({reasonFilters, currentReasonFilterType, onFilterReasonTypeChange}) {
    super();
    this.#reasonFilters = reasonFilters;
    this.#currentReasonFilter = currentReasonFilterType;
    this.#handleFilterReasonTypeChange = onFilterReasonTypeChange;

    this.element.querySelector('.filter-reason__form-fields')
      .addEventListener('change', this.#filterReasonTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#reasonFilters, this.#currentReasonFilter);
  }

  #filterReasonTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterReasonTypeChange(getFilterValue(evt.target.value));
  };
}
