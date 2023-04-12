import { render, remove, RenderPosition } from '../framework/render.js';
import HeroPopupView from '../view/hero-popup-view.js';
import DefferedView from '../view/deffered-view.js';

export default class CartPresenter {
  #mainContainer = null;
  #defferedComponent = null;
  #heroPopupComponent = null;
  #flowerPresenters = new Map();
  #cart = null;
  #sortComponent = null;

  constructor({mainContainer, flowerPresenters, cart, sortComponent}) {
    this.#mainContainer = mainContainer;
    this.#flowerPresenters = flowerPresenters;
    this.#cart = cart;
    this.#sortComponent = sortComponent;
  }

  init(flowers) {
    this.#renderDeffered();
    this.#renderHero();
    this.#renderFlowers(flowers);
  }

  destroy() {
    remove(this.#defferedComponent);
    remove(this.#heroPopupComponent);
  }

  #renderDeffered() {
    this.#defferedComponent = new DefferedView({
      onClick: this.#handleButtonToCatalogueClick,
      cart: this.#cart
    });
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

  #handleButtonToCatalogueClick = () => {
    this.#mainContainer.style.display = 'block';
    this.destroy();
    this.#sortComponent.element.scrollIntoView({behavior: 'smooth'});
  };
}
