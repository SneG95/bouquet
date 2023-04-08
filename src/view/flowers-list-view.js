import AbstractView from '../framework/view/abstract-view.js';

const createFlowersListTemplate = () => '<ul class="catalogue__list"></ul>';

export default class FlowersListView extends AbstractView {
  get template() {
    return createFlowersListTemplate();
  }
}
