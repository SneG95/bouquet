import Observable from '../framework/observable.js';
import { UpdateType } from '../consts.js';

export default class FlowersModel extends Observable {
  #flowersApiService = null;
  #flowers = null;
  #cart = null;

  constructor({flowersApiService}) {
    super();
    this.#flowersApiService = flowersApiService;
  }

  get flowers() {
    return this.#flowers;
  }

  get cart() {
    return this.#cart;
  }

  async init() {
    try {
      this.#flowers = await this.#flowersApiService.flowers;
      this.#cart = await this.#flowersApiService.cart;
    } catch(err) {
      this.#flowers = [];
      //this.#cart = {};
    }

    this._notify(UpdateType.INIT);
  }
}
