import { render, replace, remove } from '../framework/render.js';
import FilterReasonView from '../view/filter-reason-view.js';
import FilterColorView from '../view/filter-color-view.js';
import { FilterReasonType, FilterColorType, ReasonDescription, ColorDescription, UpdateType } from '../consts.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #filterReasonComponent = null;
  #filterColorComponent = null;
  #flowersModel = null;

  constructor({filterContainer, filterModel, flowersModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#flowersModel = flowersModel;

    this.#flowersModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get reasonFilters() {
    return [
      {
        name: FilterReasonType.ALL,
        description: ReasonDescription.ALL
      },
      {
        name: FilterReasonType.BIRTHDAY,
        description: ReasonDescription.BIRTHDAY
      },
      {
        name: FilterReasonType.BRIDE,
        description: ReasonDescription.BRIDE
      },
      {
        name: FilterReasonType.MOTHER,
        description: ReasonDescription.MOTHER
      },
      {
        name: FilterReasonType.COLLEAGUE,
        description: ReasonDescription.COLLEAGUE
      },
      {
        name: FilterReasonType.DARLING,
        description: ReasonDescription.DARLING
      }
    ];
  }

  get colorFilters() {
    return [
      {
        name: FilterColorType.ALL,
        description: ColorDescription.ALL
      },
      {
        name: FilterColorType.RED,
        description: ColorDescription.RED
      },
      {
        name: FilterColorType.WHITE,
        description: ColorDescription.WHITE
      },
      {
        name: FilterColorType.LILAC,
        description: ColorDescription.LILAC
      },
      {
        name: FilterColorType.YELLOW,
        description: ColorDescription.YELLOW
      },
      {
        name: FilterColorType.PINK,
        description: ColorDescription.PINK
      }
    ];
  }

  init() {
    const prevFilterReasonComponent = this.#filterReasonComponent;
    const prevFilterColorComponent = this.#filterColorComponent;

    this.#filterReasonComponent = new FilterReasonView({
      reasonFilters: this.reasonFilters,
      currentReasonFilterType: this.#filterModel.reasonFilter,
      onFilterReasonTypeChange: this.#handleFilterReasonTypeChange
    });

    this.#filterColorComponent = new FilterColorView({
      colorFilters: this.colorFilters,
      currentsColorFilterType: this.#filterModel.colorFilters,
      onFilterColorTypeChange: this.#handleFilterColorTypeChange
    });

    if (prevFilterReasonComponent === null && prevFilterColorComponent === null) {
      render(this.#filterReasonComponent, this.#filterContainer);
      render(this.#filterColorComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterReasonComponent, prevFilterReasonComponent);
    replace(this.#filterColorComponent, prevFilterColorComponent);
    remove(prevFilterReasonComponent);
    remove(prevFilterColorComponent);
  }

  destroy() {
    remove(this.#filterReasonComponent);
    remove(this.#filterColorComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterReasonTypeChange = (filterType) => {
    if (this.#filterModel.reasonFilter === filterType) {
      return;
    }

    this.#filterModel.setReasonFilter(UpdateType.MAJOR, filterType);
  };

  #handleFilterColorTypeChange = () => {

  };
}
