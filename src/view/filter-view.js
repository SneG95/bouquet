import AbstractView from '../framework/view/abstract-view.js';
import { FilterReasonType, ReasonDescription, FilterColorType, ColorDescription } from '../consts.js';

const createReasonItemTemplate = (filter, currentFilterType) => {

};

const createColorItemTemplate = (filter, currentFilterType) => {

};

const createFilterTemplate = (filters, currentFilterType) => {
  const filterReasonsTemplate = filters.map((filter) => createReasonItemTemplate(filter, currentFilterType)).join('');
  const filterColorsTemplate = filters.map((filter) => createColorItemTemplate(filter, currentFilterType)).join('');

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
    </section>
    <section class="filter-color">
      <div class="container">
        <h2 class="title title--h3 filter-color__title">Выберите основной цвет для букета</h2>
        <form class="filter-color__form" action="#" method="post">
          <div class="filter-color__form-fields" data-filter-color="filter">

            ${filterColorsTemplate}

          </div>
          <button class="visually-hidden" type="submit" tabindex="-1">применить фильтр</button>
        </form>
      </div>
    </section>`
  );
};

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterReasonTypeChange = null;
  #handleFilterColorTypeChange = null;

  constructor({filters, currentFilterType, onFilterReasonTypeChange, onFilterColorTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterReasonTypeChange = onFilterReasonTypeChange;
    this.#handleFilterColorTypeChange = onFilterColorTypeChange;

    this.element.querySelector('.filter-reason__form-fields')
      .addEventListener('change', this.#filterReasonTypeChangeHandler);
    this.element.querySelector('.filter-color__form-fields')
      .addEventListener('change', this.#filterColorTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterReasonTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterReasonTypeChange(evt.target.value);
  };

  #filterColorTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterColorTypeChange(evt.target.value);
  };
}
