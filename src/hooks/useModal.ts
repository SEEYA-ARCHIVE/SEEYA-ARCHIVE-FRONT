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
  const [lock, setLock] = useRecoilState(modalLockState);

  const openModal = (component: ReactElement) => {
    setModalList((prev) => [...prev, component]);
  };

  const closeCurrentModal = () => {
    if (blur) setBlur(false);
    if (lock) setLock(false);

    setModalList((prev) => [...prev].slice(0, prev.length - 1));
  };

  const manageOptions = (options: IOptions) => {
    const { backgroundBlur, backgroundLock } = options;

    if (backgroundBlur) setBlur(true);
    if (backgroundLock) setLock(true);
  };

  return {
    openModal,
    closeCurrentModal,
  };
};

export default useModal;
