import { render } from '../framework/render.js';
import HeaderView from '../view/header-view.js';
import HeroView from '../view/hero-view.js';
import MissionView from '../view/mission-view.js';
import AdvantageView from '../view/advantage-view.js';
import FilterPresenter from './filter-presenter.js';

export default class BoardPresenter {
  #flowersModel = null;
  #filterModel = null;
  #mainContainer = null;
  #headerComponent = null;
  #headerContainer = null;
  #heroComponent = null;
  #missionComponent = null;
  #advantageComponent = null;

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
}
