import AbstractView from '../framework/view/abstract-view.js';

const createBoardTemplate = () => (`
  <div class="catalogue" data-items="catalogue">
    <div class="container">
      <div class="catalogue__header">
        <h2 class="title title--h3 catalogue__title">Каталог</h2>
      </div>
    </div>
  </div>`
);

export default class BoardView extends AbstractView {
  get template() {
    return createBoardTemplate();
  }
}
