import Observable from '../framework/observable.js';
import { FilterReasonType, FilterColorType } from '../consts.js';

export default class FilterModel extends Observable {
  #reasonFilter = FilterReasonType.ALL;
  #colorFilters = FilterColorType.ALL;

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
    /*this.#colorFilters = colorFilter;
    this._notify(updateType, colorFilter);*/
  }
}
