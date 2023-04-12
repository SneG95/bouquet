import { render, remove } from '../framework/render.js';
import HeaderView from '../view/header-view.js';
import HeroView from '../view/hero-view.js';
import MissionView from '../view/mission-view.js';
import AdvantageView from '../view/advantage-view.js';
import FilterPresenter from './filter-presenter.js';
import BoardView from '../view/board-view.js';
import SortView from '../view/sort-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import ButtonsListView from '../view/buttons-list-view.js';
import FlowersListView from '../view/flowers-list-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import UpButtonView from '../view/up-button-view.js';
import FlowerPresenter from './flower-presenter.js';
import CartPresenter from './cart-presenter.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { SortType, UpdateType, FilterReasonType, FilterColorType, TimeLimit, UserAction } from '../consts.js';
import { sortPriceDown, sortPriceUp, filter } from '../utils.js';

const FLOWER_COUNT_PER_STEP = 6;

export default class BoardPresenter {
  #flowersModel = null;
  #filterModel = null;
  #filterReasonType = FilterReasonType.ALL;
  #filterColorTypes = [FilterColorType.ALL];
  #filterPresenter = null;
  #mainContainer = null;
  #headerComponent = null;
  #headerContainer = null;
  #heroComponent = null;
  #missionComponent = null;
  #advantageComponent = null;
  #boardComponent = new BoardView();
  #listEmptyComponent = null;
  #currentSortType = SortType.DEFAULT;
  #sortComponent = null;
  #flowersListComponent = new FlowersListView();
  #buttonsListComponent = new ButtonsListView();
  #showMoreButtonComponent = null;
  #upButtonComponent = null;
  #renderedFlowerCount = FLOWER_COUNT_PER_STEP;
  #flowerPresenters = new Map();
  #cart = null;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({flowersModel, filterModel, mainContainer, headerContainer}) {
    this.#flowersModel = flowersModel;
    this.#filterModel = filterModel;
    this.#mainContainer = mainContainer;
    this.#headerContainer = headerContainer;

    this.#flowersModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get flowers() {
    this.#filterReasonType = this.#filterModel.reasonFilter;
    this.#filterColorTypes = this.#filterModel.colorFilters;
    const flowers = this.#flowersModel.flowers;
    const filteredFlowers = filter[this.#filterReasonType](flowers).filter((flower) => (
      this.#filterColorTypes.includes(FilterColorType.ALL) ? true : this.#filterColorTypes.includes(flower.color))
    );

    switch (this.#currentSortType) {
      case SortType.INCREASE:
        return filteredFlowers.slice().sort(sortPriceUp);
      case SortType.DESCENDING:
        return filteredFlowers.slice().sort(sortPriceDown);
    }

    return filteredFlowers;
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard() {
    const flowers = this.flowers;
    const flowersCount = flowers.length;
    this.#cart = this.#flowersModel.cart;

    if (flowersCount === 0) {
      this.#renderHeader(this.#cart);
      this.#renderHero();
      this.#renderMission();
      this.#renderAdvantage();
      this.#renderFilters();
      render(this.#boardComponent, this.#mainContainer);
      this.#renderSort();
      this.#renderListEmpty();
      render(this.#buttonsListComponent, this.#boardComponent.catalogueContainer);
      this.#renderShowMoreButton(true);
      this.#renderUpButton();
      return;
    }

    this.#renderHeader(this.#cart);
    this.#renderHero();
    this.#renderMission();
    this.#renderAdvantage();
    this.#renderFilters();
    render(this.#boardComponent, this.#mainContainer);
    this.#renderSort();
    this.#renderFlowersList();
    this.#renderFlowers(flowers.slice(0, Math.min(flowersCount, this.#renderedFlowerCount)), this.#cart);
    render(this.#buttonsListComponent, this.#boardComponent.catalogueContainer);

    if (flowersCount > this.#renderedFlowerCount) {
      this.#renderShowMoreButton();
    }

    this.#renderUpButton();
  }

  #renderHeader(cart) {
    this.#headerComponent = new HeaderView({
      cart: cart,
      onClick: this.#handleCartClick
    });
    render(this.#headerComponent, this.#headerContainer);
  }

  #renderHero() {
    this.#heroComponent = new HeroView({
      onClick: this.#handleButtonToSortCatalogueClick
    });
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
    this.#filterPresenter = new FilterPresenter({
      filterContainer: this.#mainContainer,
      filterModel: this.#filterModel,
      flowersModel: this.#flowersModel
    });

    this.#filterPresenter.init();
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType : this.#currentSortType
    });

    render(this.#sortComponent, this.#boardComponent.sortContainer);
  }

  #renderFlowersList() {
    render(this.#flowersListComponent, this.#boardComponent.catalogueContainer);
  }

  #renderFlowers(flowers, cart) {
    flowers.forEach((flower) => this.#renderFlower(flower, Object.keys(cart).length === 0 ? false : Object.keys(cart.products).includes(flower.id)));
  }

  #renderFlower(flower, isChecked) {
    const flowerPresenter = new FlowerPresenter({
      flowersListContainer: this.#flowersListComponent.element,
      isChecked: isChecked,
      onDataChange: this.#handleViewAction
    });

    flowerPresenter.init(flower);
    this.#flowerPresenters.set(flower.id, flowerPresenter);
  }

  #renderListEmpty() {
    this.#listEmptyComponent = new ListEmptyView();
    render(this.#listEmptyComponent, this.#boardComponent.catalogueContainer);
  }

  #renderShowMoreButton(isEmpty = false) {
    this.#showMoreButtonComponent = new ShowMoreButtonView({
      onClick: this.#handleShowMoreButtonClick,
      isEmpty: isEmpty
    });

    render(this.#showMoreButtonComponent, this.#buttonsListComponent.element);
  }

  #renderUpButton() {
    this.#upButtonComponent = new UpButtonView({
      onClick: this.#handleButtonToSortCatalogueClick
    });

    render(this.#upButtonComponent, this.#buttonsListComponent.element);
  }

  #clearBoard({resetRenderedFlowerCount = false, resetSortType = false} = {}) {
    const flowerCount = this.flowers.length;

    this.#flowerPresenters.forEach((presenter) => presenter.destroy());
    this.#flowerPresenters.clear();
    this.#filterPresenter.destroy();

    remove(this.#headerComponent);
    remove(this.#heroComponent);
    remove(this.#missionComponent);
    remove(this.#advantageComponent);
    remove(this.#sortComponent);
    remove(this.#listEmptyComponent);
    remove(this.#showMoreButtonComponent);

    this.#renderedFlowerCount = resetRenderedFlowerCount ? FLOWER_COUNT_PER_STEP : Math.min(flowerCount, this.#renderedFlowerCount);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedFilmCount: true});
    this.#renderBoard();
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.ADD_TO_FAVORITE:
        //this.#newEventPresenter.setSaving();
        try {
          await this.#flowersModel.addToFavorite(updateType, update);
        } catch(err) {
          //this.#newEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_FROM_FAVORITE:
        //this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#flowersModel.deleteFromFavorite(updateType, update);
        } catch(err) {
          //this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#flowerPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetRenderedFlowerCount: true, resetSortType: true});
        this.#renderBoard();
        break;
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

  #handleShowMoreButtonClick = () => {
    const flowerCount = this.flowers.length;
    const newRenderedFlowerCount = Math.min(flowerCount, this.#renderedFlowerCount + FLOWER_COUNT_PER_STEP);
    const flowers = this.flowers.slice(this.#renderedFlowerCount, newRenderedFlowerCount);

    this.#renderFlowers(flowers, this.#cart);
    this.#renderedFlowerCount = newRenderedFlowerCount;

    if (this.#renderedFlowerCount >= flowerCount) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #handleButtonToSortCatalogueClick = () => {
    this.#sortComponent.element.scrollIntoView({behavior: 'smooth'});
  };

  #handleCartClick = () => {
    const flowers = this.flowers.filter((flower) => Object.keys(this.#cart.products).includes(flower.id));
    const cartPresenter = new CartPresenter({
      mainContainer: this.#mainContainer,
      flowerPresenters: this.#flowerPresenters
    });

    cartPresenter.init(flowers);
  };
}
