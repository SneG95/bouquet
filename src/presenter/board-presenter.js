import { render } from '../framework/render.js';
import HeaderView from '../view/header-view.js';
import HeroView from '../view/hero-view.js';
import MissionView from '../view/mission-view.js';
import AdvantageView from '../view/advantage-view.js';

export default class BoardPresenter {
  #flowersModel = null;
  #mainContainer = null;
  #headerComponent = null;
  #headerContainer = null;
  #heroComponent = null;
  #missionComponent = null;
  #advantageComponent = null;

  constructor({flowersModel, mainContainer, headerContainer}) {
    this.#flowersModel = flowersModel;
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
}
