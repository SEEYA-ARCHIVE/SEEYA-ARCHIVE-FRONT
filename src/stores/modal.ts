import { atom } from 'recoil';
import { ModalType } from 'src/components/common/modal/Modal';

export const modalListState = atom<ModalType[]>({
  key: 'modalListState',
  default: [],
});

export const modalBlurState = atom({
  key: 'modalBlurState',
  default: false,
});

export const modalLockState = atom({
  key: 'modalLockState',
  default: false,
});
