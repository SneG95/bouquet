import { render, remove, RenderPosition } from '../framework/render.js';
import HeroPopupView from '../view/hero-popup-view.js';
import DefferedView from '../view/deffered-view.js';

export default class CartPresenter {
  #mainContainer = null;
  #defferedComponent = null;
  #heroPopupComponent = null;
  #flowerPresenters = new Map();

  constructor({mainContainer, flowerPresenters}) {
    this.#mainContainer = mainContainer;
    this.#flowerPresenters = flowerPresenters;
  }

  init(flowers) {
    this.#renderDeffered();
    this.#renderHero();
    this.#renderFlowers(flowers);
  }

  #renderDeffered() {
    this.#defferedComponent = new DefferedView();
    render(this.#defferedComponent, this.#mainContainer, RenderPosition.AFTEREND);
  }

  #renderHero() {
    this.#heroPopupComponent = new HeroPopupView({
      onClick: this.#handleHeroButtonClick
    });
    render(this.#heroPopupComponent, this.#defferedComponent.popupDefferedContainer, RenderPosition.AFTERBEGIN);
  }

  #renderFlowers(flowers) {
    flowers.forEach((flower) => this.#renderFlower(flower));
  }

  #renderFlower(flower) {
    this.#flowerPresenters.get(flower.id).renderFlowerDefferedComponent(this.#defferedComponent.flowersContainer);
  }

  #handleHeroButtonClick = () => {
    remove(this.#heroPopupComponent);
  };
}
