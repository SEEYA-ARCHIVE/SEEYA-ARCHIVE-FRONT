import { Component, ReactElement } from 'react';
import { modalBlurState } from './../stores/modal';
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

  const openModal = (component: ModalType, options?: IOptions) => {
    setModalList((prev) => [...prev, component]);

    if (options) manageOptions(options);
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
