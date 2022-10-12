import * as hallHandlers from './hall';
import * as seatHandlers from './seat';
import * as compareHandlers from './compare';

export const handlers = [
  ...Object.values(hallHandlers),
  ...Object.values(seatHandlers),
  ...Object.values(compareHandlers),
];
