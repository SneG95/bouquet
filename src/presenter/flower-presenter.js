import { render, remove } from '../framework/render.js';
import FlowerCardView from '../view/flower-card-view.js';
import FlowerDefferedView from '../view/flower-deffered-view.js';
import { UpdateType, UserAction } from '../consts.js';

export default class FlowerPresenter {
  #flowersListContainer = null;
  #flowerCardComponent = null;
  #flowerDefferedComponent = null;
  #flower = null;
  #isChecked = null;
  #handleDataChange = null;

  constructor({flowersListContainer, isChecked, onDataChange}) {
    this.#flowersListContainer = flowersListContainer;
    this.#isChecked = isChecked;
    this.#handleDataChange = onDataChange;
  }

  init(flower) {
    this.#flower = flower;

    const prevFlowerCardComponent = this.#flowerCardComponent;

    this.#flowerCardComponent = new FlowerCardView({
      flower: this.#flower,
      isChecked: this.#isChecked,
      onFavoriteClick: this.#handleFavoriteClick
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

  renderFlowerDefferedComponent(cartContainer) {
    this.#flowerDefferedComponent = new FlowerDefferedView({
      flower: this.#flower
    });

    render(this.#flowerDefferedComponent, cartContainer);
  }

  #handleFavoriteClick = () => {
    if (!this.#isChecked) {
      this.#handleDataChange(
        UserAction.ADD_TO_FAVORITE,
        UpdateType.MINOR,
        this.#flower.id
      );
    } else {
      this.#handleDataChange(
        UserAction.DELETE_FROM_FAVORITE,
        UpdateType.MINOR,
        this.#flower.id
      );
    }
  };
}
