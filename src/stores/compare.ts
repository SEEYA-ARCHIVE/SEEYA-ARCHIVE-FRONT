import { atom } from 'recoil';

export const compareSeatState = atom<{
  left: { floor: number; area: string } | null;
  right: { floor: number; area: string } | null;
}>({
  key: 'compateSeat',
  default: { left: null, right: null },
});
