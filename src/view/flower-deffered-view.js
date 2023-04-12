import AbstractView from '../framework/view/abstract-view.js';
import { getClippedDescription, getImageSource } from '../utils.js';

const createFlowerDefferedTemplate = (flower) => {
  const {description, previewImage, price, title} = flower;
  const imgSourse = getImageSource(previewImage);

  return(`
    <li class="popup-deferred__item">
      <div class="deferred-card">
        <div class="deferred-card__img">
          <picture>
            <source type="image/png" srcset="${imgSourse}.png, ${imgSourse}@2x.png 2x">
            <img src="${imgSourse}.png" srcset="${imgSourse}@2x.jpg 2x" width="233" height="393" alt="букет">
          </picture>
        </div>
        <div class="deferred-card__content">
          <h2 class="title title--h2">${title}</h2>
          <p class="text text--size-40">${description.length > 140 ? getClippedDescription(description) : description}</p>
        </div>
        <div class="deferred-card__count">
          <button class="btn-calculate" type="button">
            <svg width="30" height="27" aria-hidden="true">
              <use xlink:href="#icon-minus"></use>
            </svg>
          </button><span>1</span>
          <button class="btn-calculate" type="button">
            <svg width="30" height="28" aria-hidden="true">
              <use xlink:href="#icon-cross"></use>
            </svg>
          </button>
        </div>
        <div class="deferred-card__price"><b class="price price--size-middle-p">${price}<span>Р</span></b></div>
        <button class="btn-close deferred-card__close-btn" type="button">
          <svg width="55" height="56" aria-hidden="true">
            <use xlink:href="#icon-close-big"></use>
          </svg>
        </button>
        <svg class="deferred-card__close-btn deferred-card__loader" width="56" height="56" aria-hidden="true">
          <use xlink:href="#icon-loader"></use>
        </svg>
      </div>
    </li>`
  );
};

export default class FlowerDefferedView extends AbstractView {
  #flower = null;

  constructor({flower}) {
    super();
    this.#flower = flower;
  }

  get template() {
    return createFlowerDefferedTemplate(this.#flower);
  }
}
