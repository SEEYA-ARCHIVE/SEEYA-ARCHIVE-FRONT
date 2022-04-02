import { ReactElement } from 'react';
import { atom } from 'recoil';

export const modalListState = atom<ReactElement[]>({
  key: 'modalList',
  default: [],
});

export const modalBlurState = atom({
  key: 'modalBlurState',
  default: false,
});
