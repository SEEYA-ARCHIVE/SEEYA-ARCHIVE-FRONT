import { ReactElement } from 'react';
import { atom } from 'recoil';

export const modalListState = atom<ReactElement[]>({
  key: 'modalList',
  default: [],
});

export const modalBackgroundTransparentState = atom({
  key: 'modalBackgroundTransparent',
  default: false,
});

export const modalBackgroundBlurState = atom({
  key: 'modalBackgroundBlur',
  default: false,
});

export const modalBackgroundLockState = atom({
  key: 'modalBackgroundLock',
  default: false,
});
