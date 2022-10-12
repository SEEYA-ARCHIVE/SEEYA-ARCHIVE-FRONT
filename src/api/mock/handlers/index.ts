import * as hallHandlers from './hall';
import * as seatHandlers from './seat';

export const handlers = [...Object.values(hallHandlers), ...Object.values(seatHandlers)];
