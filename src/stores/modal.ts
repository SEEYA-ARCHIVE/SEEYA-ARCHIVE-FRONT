import { atom } from 'recoil';
import { IModal } from 'src/components/Modal/ModalManager';

export const modalListState = atom<IModal[]>({
  key: 'modalListState',
  default: [],
});
