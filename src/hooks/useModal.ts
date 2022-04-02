import { ReactElement } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalListState } from 'src/stores/modal';
import { IOptions, ModalType } from 'src/components/Modal/Modal';

interface IUseModal {
  openModal: (component: ReactElement) => void;
  closeCurrentModal: () => void;
}

const useModal = (): IUseModal => {
  const setModalList = useSetRecoilState(modalListState);
  const [blur, setBlur] = useRecoilState(modalBlurState);

  const openModal = (component: ReactElement) => {
    setModalList((prev) => [...prev, component]);
  };

  const closeCurrentModal = () => {
    if (blur) setBlur(false);

    setModalList((prev) => [...prev].slice(0, prev.length - 1));
  };

  const manageOptions = (options: IOptions) => {
    const { blur } = options;

    if (blur) setBlur(true);
  };

  return {
    openModal,
    closeCurrentModal,
  };
};

export default useModal;
