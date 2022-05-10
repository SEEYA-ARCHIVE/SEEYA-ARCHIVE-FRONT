import { atom, selector, selectorFamily } from 'recoil';
import { MOCK_SEAT_AREA } from 'src/api/mock/seat_areas';
import { getSeatAreaAPI, SeatAreaType } from 'src/api/seat';

interface SeatType {
  floor: string;
  area: string;
}

export const selectSeatAtom = atom<SeatType>({
  key: 'selectSeat',
  default: {
    floor: '1',
    area: '',
  },
});
