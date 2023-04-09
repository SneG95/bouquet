import { render } from '../framework/render.js';
import HeaderView from '../view/header-view.js';
import HeroView from '../view/hero-view.js';
import MissionView from '../view/mission-view.js';
import AdvantageView from '../view/advantage-view.js';
import FilterPresenter from './filter-presenter.js';
import BoardView from '../view/board-view.js';
import SortView from '../view/sort-view.js';
import FlowersListView from '../view/flowers-list-view.js';
import FlowerPresenter from './flower-presenter.js';
import { SortType, UpdateType } from '../consts.js';

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
  #flowerPresenters = new Map();

  constructor({flowersModel, filterModel, mainContainer, headerContainer}) {
    this.#flowersModel = flowersModel;
    this.#filterModel = filterModel;
    this.#mainContainer = mainContainer;
    this.#headerContainer = headerContainer;

    this.#flowersModel.addObserver(this.#handleModelEvent);
  }

  get flowers() {
    return this.#flowersModel.flowers;
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard() {
    const flowers = this.flowers;
    //const flowersCount = flowers.length;

    this.#renderHeader();
    this.#renderHero();
    this.#renderMission();
    this.#renderAdvantage();
    this.#renderFilters();
    render(this.#boardComponent, this.#mainContainer);
    this.#renderSort();
    this.#renderFlowersList();
    this.#renderFlowers(flowers);
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

  #renderFlowers(flowers) {
    flowers.forEach((flower) => this.#renderFlower(flower));
  }

  #renderFlower(flower) {
    const flowerPresenter = new FlowerPresenter({
      flowersListContainer: this.#flowersListComponent.element
    });

    flowerPresenter.init(flower);
    this.#flowerPresenters.set(flower.id, flowerPresenter);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    /*this.#clearBoard({resetRenderedFilmCount: true});
    this.#renderBoard();*/
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      /*case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;*/
      case UpdateType.INIT:
        /*this.#isLoading = false;
        remove(this.#loadingComponent);*/
        this.#renderBoard();
        break;
      /*case UpdateType.ERROR:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderListEmpty(true);
        break;*/
    }
  };
}
