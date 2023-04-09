import { render, remove, replace } from '../framework/render.js';
import FlowerCardView from '../view/flower-card-view.js';

export default class FlowerPresenter {
  #flowersListContainer = null;
  #flowerCardComponent = null;
  #flower = null;

  constructor({flowersListContainer}) {
    this.#flowersListContainer = flowersListContainer;
  }

  async init(flower) {
    this.#flower = flower;

    const prevFlowerCardComponent = this.#flowerCardComponent;

    this.#flowerCardComponent = new FlowerCardView({
      flower: this.#flower
    });

    if (prevFlowerCardComponent === null) {
      render(this.#flowerCardComponent, this.#flowersListContainer);
      //return;
    }

  }
}
