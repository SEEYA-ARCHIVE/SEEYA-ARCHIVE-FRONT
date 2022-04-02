import { Component, ReactElement } from 'react';
import { modalBlurState, modalLockState } from './../stores/modal';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { modalListState } from 'src/stores/modal';
import { IOptions, ModalType } from 'src/components/Modal/Modal';

interface IUseModal {
  openModal: (component: ModalType, options?: IOptions) => void;
  closeCurrentModal: () => void;
}

const useModal = (): IUseModal => {
  const setModalList = useSetRecoilState(modalListState);
  const [blur, setBlur] = useRecoilState(modalBlurState);
  const [lock, setLock] = useRecoilState(modalLockState);

  const openModal = (component: ModalType, options?: IOptions) => {
    setModalList((prev) => [...prev, component]);

    if (options) manageOptions(options);
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
