import AbstractView from '../framework/view/abstract-view.js';

const createDefferedTemplate = () => (`
  <section class="popup-deferred" style="display:block;">
    <div class="popup-deferred__wrapper">
      <div class="popup-deferred__container">
        <a class="btn btn--with-icon popup-deferred__btn btn--light" href="#">в&nbsp;каталог
          <svg width="61" height="24" aria-hidden="true">
            <use xlink:href="#icon-arrow"></use>
          </svg>
        </a>
        <ul class="popup-deferred__catalog"></ul>
        <div class="popup-deferred__btn-container">
          <button class="btn btn--with-icon popup-deferred__btn-clean" type="button">очистить
            <svg width="61" height="24" aria-hidden="true">
              <use xlink:href="#icon-arrow"></use>
            </svg>
          </button>
        </div>
        <div class="popup-deferred__sum">
          <p class="text text--total">Итого вы выбрали:</p>
          <div class="popup-deferred__block-wrap">
            <div class="popup-deferred__block">
              <p class="text text--total">Букеты</p><span class="popup-deferred__count" data-atribut="count-defer">4</span>
            </div>
            <div class="popup-deferred__block">
              <p class="text text--total">Сумма</p><b class="price price--size-middle-p">15 700<span>Р</span></b>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`
);

export default class DefferedView extends AbstractView {

  /*constructor({}) {
    super();
  }*/

  get template() {
    return createDefferedTemplate();
  }

}
