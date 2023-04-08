// Импорт вендоров и утилит, не удаляйте его
import './vendor';
import { ImageSlider } from './utils/image-slider';
import { iosVhFix } from './utils/ios-vh-fix';
import { modals, initModals } from './modals/init-modals';

// Ваши импорты...

import FlowersApiService from './api/flowers-api-service';
import FlowersModel from './model/flowers-model';
import FilterModel from './model/filter-model';
import BoardPresenter from './presenter/board-presenter';

// Код для работы попапов, не удаляйте его
window.addEventListener('DOMContentLoaded', () => {
  iosVhFix();

  window.addEventListener('load', () => {
    // Инициализация слайдера
    const imageSlider = new ImageSlider('.image-slider');
    imageSlider.init();

    // Инициализация попапов
    initModals();
  });

  // Пример кода для открытия попапа
  document
    .querySelector('.element-which-is-open-popup')
    .addEventListener('click', () => modals.open('popup-data-attr'));

  // Код отработает, если разметка попапа уже отрисована в index.html

  // Если вы хотите рисовать разметку попапа под каждое "открытие",
  // то не забудьте перенесети в код addEventListener инициализацию слайдера

  // ------------

  // Ваш код...
  const AUTHORIZATION = 'Basic sv74dlm5qor';
  const END_POINT = 'https://grading.objects.pages.academy/flowers-shop';

  const mainContainer = document.querySelector('main');
  const headerContainer = document.querySelector('.header__wrapper');
  const flowersModel = new FlowersModel({
    flowersApiService: new FlowersApiService(END_POINT, AUTHORIZATION)
  });
  const filterModel = new FilterModel();
  const boardPresenter = new BoardPresenter({
    flowersModel,
    filterModel,
    mainContainer: mainContainer,
    headerContainer: headerContainer
  });

  boardPresenter.init();
  flowersModel.init();
});
