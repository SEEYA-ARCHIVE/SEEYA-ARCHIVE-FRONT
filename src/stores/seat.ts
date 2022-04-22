import { atom, selector, selectorFamily } from 'recoil';
import { getSeatAreaAPI, SeatAreaType } from 'src/api/seat';

interface SeatType {
  floor: string;
  sector: string;
  number: number;
}

export const selectSeatAtom = atom<SeatType>({
  key: 'selectSeat',
  default: {
    floor: '',
    sector: '',
    number: 0,
  },
});

export const getSeatArea = selectorFamily<SeatAreaType[] | null, number>({
  key: 'GET/seatArea',
  get: (hallId) => async () => {
    try {
      return await getSeatAreaAPI(hallId);
    } catch (err) {
      return null;
    }
  },
});
