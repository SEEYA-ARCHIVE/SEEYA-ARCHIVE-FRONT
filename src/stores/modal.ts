import { atom } from 'recoil';
import { ModalType } from 'src/components/Modal/Modal';

export const modalListState = atom<ModalType[]>({
  key: 'modalListState',
  default: [],
});

export const modalBlurState = atom({
  key: 'modalBlurState',
  default: false,
});
