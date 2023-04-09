const FilterReasonType = {
  ALL: 'all',
  BIRTHDAY: 'birthday',
  BRIDE: 'bride',
  MOTHER: 'mother',
  COLLEAGUE: 'colleague',
  DARLING: 'darling'
};

const ServerReasonType = {
  BIRTHDAY: 'birthdayboy',
  BRIDE: 'bridge',
  MOTHER: 'motherday',
  COLLEAGUE: 'colleagues',
  DARLING: 'forlove'
};

const ReasonDescription = {
  ALL: 'Для всех',
  BIRTHDAY: 'Имениннику',
  BRIDE: 'Невесте',
  MOTHER: 'Маме',
  COLLEAGUE: 'Коллеге',
  DARLING: 'Любимой'
};

const FilterColorType = {
  ALL: 'all',
  RED: 'red',
  WHITE: 'white',
  LILAC : 'lilac',
  YELLOW: 'yellow',
  PINK: 'pink'
};

const ServerColorType = {
  RED: 'red',
  WHITE: 'white',
  LILAC : 'violet',
  YELLOW: 'yellow',
  PINK: 'pink'
};

const ColorDescription = {
  ALL: 'все цвета',
  RED: 'красный',
  WHITE: 'белый',
  LILAC : 'сиреневый',
  YELLOW: 'жёлтый',
  PINK: 'розовый'
};

const SortType = {
  INCREASE: 'increase',
  DESCENDING: 'descending'
};

const SortTypeDescription = {
  INCREASE: 'сортировка по возрастанию цены',
  DESCENDING: 'сортировка по убыванию цены'
};

const ImageType = {
  PNG: '.png',
  WEBP: '.webp'
};

export { FilterReasonType, ReasonDescription, FilterColorType, ColorDescription, ServerReasonType, ServerColorType, SortType, SortTypeDescription, ImageType };
