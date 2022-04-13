import { ReactElement } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalListState } from 'src/stores/modal';

interface IUseModal {
  openModal: (component: ReactElement) => void;
  closeCurrentModal: () => void;
}

const useModal = (): IUseModal => {
  const setModalList = useSetRecoilState(modalListState);

  const openModal = (component: ReactElement) => {
    setModalList((prev) => [...prev, component]);
  };

  const closeCurrentModal = () => {
    setModalList((prev) => [...prev].slice(0, prev.length - 1));
  };

  return {
    openModal,
    closeCurrentModal,
  };
};

export default useModal;
