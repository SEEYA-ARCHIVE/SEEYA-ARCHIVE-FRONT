import * as hallHandlers from './hall';
import * as seatHandlers from './seat';
import * as compareHandlers from './compare';
import * as reviewHandlers from './review';

export const handlers = [
  ...Object.values(hallHandlers),
  ...Object.values(seatHandlers),
  ...Object.values(compareHandlers),
  ...Object.values(reviewHandlers),
];
