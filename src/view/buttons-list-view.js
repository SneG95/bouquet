import AbstractView from '../framework/view/abstract-view.js';

const createButtonsListTemplate = () => '<div class="catalogue__btn-wrap"></div>';

export default class ButtonsListView extends AbstractView {
  get template() {
    return createButtonsListTemplate();
  }
}
