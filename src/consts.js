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
  DEFAULT: 'default',
  INCREASE: 'increase',
  DESCENDING: 'descending'
};

const SortTypeDescription = {
  INCREASE: 'сортировка по возрастанию цены',
  DESCENDING: 'сортировка по убыванию цены'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

const UserAction = {
  ADD_TO_FAVORITE: 'ADD_TO_FAVORITE',
  DELETE_FROM_FAVORITE: 'DELETE_FROM_FAVORITE'
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export { FilterReasonType, ReasonDescription, FilterColorType, ColorDescription, ServerReasonType, ServerColorType, SortType, SortTypeDescription, UpdateType, Method, Mode, UserAction, TimeLimit };
