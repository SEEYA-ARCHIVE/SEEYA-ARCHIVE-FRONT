import { ReactElement } from 'react';
import { atom } from 'recoil';

export const modalListState = atom<ReactElement[]>({
  key: 'modalList',
  default: [],
});

export const modalBackgroundTransparentState = atom({
  key: 'modalBackgroundTransparentState',
  default: false,
});

export const modalBackgroundBlurState = atom({
  key: 'modalBackgroundBlurState',
  default: false,
});

export const modalBackgroundLockState = atom({
  key: 'modalBackgroundLockState',
  default: false,
});
