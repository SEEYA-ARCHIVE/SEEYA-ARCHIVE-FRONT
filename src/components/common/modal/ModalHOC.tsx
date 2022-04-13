import React, { FC, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { modalBackgroundBlurState, modalBackgroundLockState, modalBackgroundTransparentState } from 'src/stores/modal';

export interface ModalWrappedProps {}

interface Props {
  backgroundBlur?: boolean;
  backgroundLock?: boolean;
  backgroundTransparent?: boolean;
}

export const ModalHOC = <P extends ModalWrappedProps>(
  WrappedComponent: React.ComponentType<P>,
): FC<Props & Omit<P, keyof ModalWrappedProps>> => {
  const ModalManageComponent = ({ backgroundBlur, backgroundLock, backgroundTransparent, ...props }: Props) => {
    const [blur, setBlur] = useRecoilState(modalBackgroundBlurState);
    const [lock, setLock] = useRecoilState(modalBackgroundLockState);
    const [transparent, setTransparent] = useRecoilState(modalBackgroundTransparentState);

    useEffect(() => {
      if (backgroundBlur && !blur) setBlur(true);
      if (backgroundLock && !lock) setLock(true);
      if (backgroundTransparent && !transparent) setTransparent(true);

      return () => {
        if (backgroundBlur && !blur) setBlur(false);
        if (backgroundLock && !lock) setLock(false);
        if (backgroundTransparent && !transparent) setTransparent(false);
      };
    }, []);
    return <WrappedComponent {...(props as P)} />;
  };

  return ModalManageComponent;
};
