import { render } from '../framework/render.js';
import HeaderView from '../view/header-view.js';
import HeroView from '../view/hero-view.js';
import MissionView from '../view/mission-view.js';
import AdvantageView from '../view/advantage-view.js';
import FilterPresenter from './filter-presenter.js';
import BoardView from '../view/board-view.js';
import SortView from '../view/sort-view.js';
import FlowersListView from '../view/flowers-list-view.js';
import { SortType } from '../consts.js';

export default class BoardPresenter {
  #flowersModel = null;
  #filterModel = null;
  #mainContainer = null;
  #headerComponent = null;
  #headerContainer = null;
  #heroComponent = null;
  #missionComponent = null;
  #advantageComponent = null;
  #boardComponent = new BoardView();
  #currentSortType = SortType.INCREASE;
  #sortComponent = null;
  #flowersListComponent = new FlowersListView();

  constructor({flowersModel, filterModel, mainContainer, headerContainer}) {
    this.#flowersModel = flowersModel;
    this.#filterModel = filterModel;
    this.#mainContainer = mainContainer;
    this.#headerContainer = headerContainer;
  }

  get flowers() {
    return this.#flowersModel.flowers;
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard() {
    this.#renderHeader();
    this.#renderHero();
    this.#renderMission();
    this.#renderAdvantage();
    this.#renderFilters();
    render(this.#boardComponent, this.#mainContainer);
    this.#renderSort();
    this.#renderFlowersList();
  }

  #renderHeader() {
    this.#headerComponent = new HeaderView();
    render(this.#headerComponent, this.#headerContainer);
  }

  #renderHero() {
    this.#heroComponent = new HeroView();
    render(this.#heroComponent, this.#mainContainer);
  }

  #renderMission() {
    this.#missionComponent = new MissionView();
    render(this.#missionComponent, this.#mainContainer);
  }

  #renderAdvantage() {
    this.#advantageComponent = new AdvantageView();
    render(this.#advantageComponent, this.#mainContainer);
  }

  #renderFilters() {
    const filterPresenter = new FilterPresenter({
      filterContainer: this.#mainContainer,
      filterModel: this.#filterModel,
      flowersModel: this.#flowersModel
    });

    filterPresenter.init();
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType : this.#currentSortType
    });

    render(this.#sortComponent, this.#boardComponent.sortContainer);
  }

  #renderFlowersList() {
    render(this.#flowersListComponent, this.#boardComponent.element);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    /*this.#clearBoard({resetRenderedFilmCount: true});
    this.#renderBoard();*/
  };
}
