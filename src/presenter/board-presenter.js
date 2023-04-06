import { render } from '../framework/render.js';

export default class BoardPresenter {
  #flowersModel = null;
  #mainContainer = null;

  constructor({flowersModel, mainContainer}) {
    this.#flowersModel = flowersModel;
    this.#mainContainer = mainContainer;
  }

  get flowers() {
    return this.#flowersModel.flowers;
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard() {

  }
}
