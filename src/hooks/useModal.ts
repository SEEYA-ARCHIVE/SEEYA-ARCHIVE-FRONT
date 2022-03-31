import { useSetRecoilState } from 'recoil';
import { IModal } from 'src/components/Modal/ModalManager';
import { modalListState } from 'src/stores/modal';

interface IUseModal {
  openModal: ({ key, props }: IModal) => void;
  closeCurrentModal: () => void;
}

const useModal = (): IUseModal => {
  const setModalList = useSetRecoilState(modalListState);

  const openModal = ({ key, props }: IModal) => {
    setModalList((prev) => [...prev, { key, props }]);
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
