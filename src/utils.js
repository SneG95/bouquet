import { FilterReasonType, FilterColorType, ServerReasonType, ServerColorType } from './consts.js';

const filter = {
  [FilterReasonType.ALL]: (flowers) => flowers,
  [FilterReasonType.BIRTHDAY]: (flowers) => flowers.filter((flower) => flower.type === ServerReasonType.BIRTHDAY),
  [FilterReasonType.BRIDE]: (flowers) => flowers.filter((flower) => flower.type === ServerReasonType.BRIDE),
  [FilterReasonType.MOTHER]: (flowers) => flowers.filter((flower) => flower.type === ServerReasonType.MOTHER),
  [FilterReasonType.COLLEAGUE]: (flowers) => flowers.filter((flower) => flower.type === ServerReasonType.COLLEAGUE),
  [FilterReasonType.DARLING]: (flowers) => flowers.filter((flower) => flower.type === ServerReasonType.DARLING),
  [FilterColorType.ALL]: (flowers) => flowers,
  [FilterColorType.RED]: (flowers) => flowers.filter((flower) => flower.color === ServerColorType.RED),
  [FilterColorType.WHITE]: (flowers) => flowers.filter((flower) => flower.color === ServerColorType.WHITE),
  [FilterColorType.LILAC]: (flowers) => flowers.filter((flower) => flower.color === ServerColorType.LILAC),
  [FilterColorType.YELLOW]: (flowers) => flowers.filter((flower) => flower.color === ServerColorType.YELLOW),
  [FilterColorType.PINK]: (flowers) => flowers.filter((flower) => flower.color === ServerColorType.PINK)
};

export { filter };
