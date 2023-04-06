import Observable from '../framework/observable.js';

export default class FlowersModel extends Observable {
  #flowersApiService = null;
  #flowers = [];

  constructor({flowersApiService}) {
    super();
    this.#flowersApiService = flowersApiService;
  }

  get flowers() {
    return this.#flowers;
  }

  async init() {
    try {
      this.#flowers = await this.#flowersApiService.flowers;
    } catch(err) {
      this.#flowers = [];
    }
  }
}