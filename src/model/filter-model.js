import Observable from '../framework/observable.js';
import { FilterReasonType, FilterColorType } from '../consts.js';

export default class FilterModel extends Observable {
  #reasonFilter = FilterReasonType.ALL;
  #colorFilters = [FilterColorType.ALL];

  get reasonFilter() {
    return this.#reasonFilter;
  }

  get colorFilters() {
    return this.#colorFilters;
  }

  setReasonFilter(updateType, reasonFilter) {
    this.#reasonFilter = reasonFilter;
    this._notify(updateType, reasonFilter);
  }

  setColorFilter(updateType, colorFilter) {
    if (colorFilter === FilterColorType.ALL && this.#colorFilters.includes(FilterColorType.ALL)) {
      return;
    }

    if (colorFilter === FilterColorType.ALL && !this.#colorFilters.includes(FilterColorType.ALL)) {
      this.#colorFilters = [FilterColorType.ALL];
    }

    if (this.#colorFilters.includes(colorFilter) && !this.#colorFilters.includes(FilterColorType.ALL)) {
      const index = this.#colorFilters.findIndex((colorType) => colorType === colorFilter);
      this.#colorFilters = [
        ...this.#colorFilters.slice(0, index),
        ...this.#colorFilters.slice(index + 1)
      ];

      if (this.#colorFilters.length === 0) {
        this.#colorFilters = [FilterColorType.ALL];
      }
    } else {
      if (this.#colorFilters.includes(FilterColorType.ALL)) {
        this.#colorFilters.splice(0, 1);
        this.#colorFilters.push(colorFilter);
      } else {
        this.#colorFilters.push(colorFilter);
      }
    }

    this._notify(updateType, this.#colorFilters);
  }
}
