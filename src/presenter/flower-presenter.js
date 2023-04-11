import { render, remove, replace } from '../framework/render.js';
import FlowerCardView from '../view/flower-card-view.js';

export default class FlowerPresenter {
  #flowersListContainer = null;
  #flowerCardComponent = null;
  #flower = null;
  #isChecked = false;

  constructor({flowersListContainer, isChecked}) {
    this.#flowersListContainer = flowersListContainer;
    this.#isChecked = isChecked;
  }

  async init(flower) {
    this.#flower = flower;

    const prevFlowerCardComponent = this.#flowerCardComponent;

    this.#flowerCardComponent = new FlowerCardView({
      flower: this.#flower,
      isChecked: this.#isChecked
    });

    if (prevFlowerCardComponent === null) {
      render(this.#flowerCardComponent, this.#flowersListContainer);
      //return;
    }
  }

  destroy() {
    remove(this.#flowerCardComponent);
    //remove(this.#filmPopupComponent);
  }
}
