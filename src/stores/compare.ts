import { atom } from 'recoil';

export const isCompareModeState = atom({
  key: 'compare mode status',
  default: false,
});

export const selectedCompareSeatState = atom<[string | null, string | null]>({
  key: 'selected seat to compare',
  default: [null, null],
});
