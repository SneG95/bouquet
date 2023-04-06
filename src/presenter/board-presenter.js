import { render } from '../framework/render.js';
import HeaderView from '../view/header-view.js';

export default class BoardPresenter {
  #flowersModel = null;
  #mainContainer = null;
  #headerComponent = null;
  #headerContainer = null;

  constructor({flowersModel, mainContainer, headerContainer}) {
    this.#flowersModel = flowersModel;
    this.#mainContainer = mainContainer;
    this.#headerContainer = headerContainer;
  }

  get flowers() {
    return this.#flowersModel.flowers;
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard() {
    this.#renderHeader();
  }

  #renderHeader() {
    this.#headerComponent = new HeaderView();
    render(this.#headerComponent, this.#headerContainer);
  }
}
