import { atom } from 'recoil';

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
