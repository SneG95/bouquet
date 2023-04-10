import AbstractView from '../framework/view/abstract-view.js';
import { getFilterValue } from '../utils.js';

const createColorItemTemplate = (filter, currentFilterTypes, index) => {
  const {name, description} = filter;
  return (`
    <div class="filter-field-img filter-color__form-field">
      <input
            class="filter-field-img__input filter-color__form-field"
            type="checkbox"
            id="filter-colors-field-id-${index}"
            name="colors"
            value="color-${name}"
            ${currentFilterTypes.includes(name) ? 'checked' : ''}
            data-filter-color="color-${name}">
        <label class="filter-field-img__label" for="filter-colors-field-id-${index}">
          <span class="filter-field-img__img">
            <picture>
              <source type="image/webp" srcset="img/content/filter-${name}.webp, img/content/filter-${name}@2x.webp 2x"><img src="img/content/filter-${name}.png" srcset="img/content/filter-${name}@2x.png 2x" width="130" height="130" alt="${description}">
            </picture>
          </span>
          <span class="filter-field-img__text">${description}</span>
        </label>
    </div>`
  );
};

const createFilterTemplate = (colorFilters, currentColorFilters) => {
  const filterColorsTemplate = colorFilters.map((filter, index) => createColorItemTemplate(filter, currentColorFilters, index)).join('');

  return(`
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

export default class FilterColorView extends AbstractView {
  #colorFilters = null;
  #currentColorFilters = null;
  #handleFilterColorTypeChange = null;

  constructor({colorFilters, currentsColorFilterType, onFilterColorTypeChange}) {
    super();
    this.#colorFilters = colorFilters;
    this.#currentColorFilters = currentsColorFilterType;
    this.#handleFilterColorTypeChange = onFilterColorTypeChange;

    this.element.querySelector('.filter-color__form-fields')
      .addEventListener('change', this.#filterColorTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#colorFilters, this.#currentColorFilters);
  }

  #filterColorTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterColorTypeChange(getFilterValue(evt.target.value));
  };
}
