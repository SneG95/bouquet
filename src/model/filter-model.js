import Observable from '../framework/observable.js';
import { FilterReasonType, FilterColorType } from '../consts.js';

export default class FilterModel extends Observable {
  #reasonFilter = FilterReasonType.ALL;
  #colorFilter = FilterColorType.ALL;

  get reasonFilter() {
    return this.#reasonFilter;
  }

  get colorFilter() {
    return this.#colorFilter;
  }

  setReasonFilter(updateType, reasonFilter) {
    this.#reasonFilter = reasonFilter;
    this._notify(updateType, reasonFilter);
  }

  setColorFilter(updateType, colorFilter) {
    this.#colorFilter = colorFilter;
    this._notify(updateType, colorFilter);
  }
}