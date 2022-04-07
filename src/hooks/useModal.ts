import { ReactElement } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalListState } from 'src/stores/modal';
import { IOptions } from 'src/components/common/modal/Modal';

interface IUseModal {
  openModal: (component: ReactElement) => void;
  closeCurrentModal: () => void;
}

const useModal = (): IUseModal => {
  const setModalList = useSetRecoilState(modalListState);
  const [blur, setBlur] = useRecoilState(modalBackgroundBlurState);
  const [lock, setLock] = useRecoilState(modalBackgroundLockState);
  const [transparent, setTransparent] = useRecoilState(modalBackgroundTransparentState);

  const openModal = (component: ReactElement) => {
    setModalList((prev) => [...prev, component]);
  };

  const closeCurrentModal = () => {
    if (blur) setBlur(false);
    if (lock) setLock(false);
    if (transparent) setTransparent(false);

    setModalList((prev) => [...prev].slice(0, prev.length - 1));
  };

  const manageOptions = (options: IOptions) => {
    const { backgroundBlur, backgroundLock, backgroundTransparent } = options;

    if (backgroundBlur) setBlur(true);
    if (backgroundLock) setLock(true);
    if (backgroundTransparent) setTransparent(true);
  };

  return {
    openModal,
    closeCurrentModal,
  };
};

export default useModal;
