import React, { FC, useEffect, useState } from 'react';
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

    const [hocBlur, setHocBlur] = useState(false);
    const [hocLock, setHocLock] = useState(false);
    const [hocTransparent, setHocTransparent] = useState(false);

    useEffect(() => {
      if (backgroundBlur && !blur) {
        setBlur(true);
        setHocBlur(true);
      }
      if (backgroundLock && !lock) {
        setLock(true);
        setHocLock(true);
      }
      if (backgroundTransparent && !transparent) {
        setTransparent(true);
        setHocTransparent(true);
      }

      return () => {
        if (hocBlur) setBlur(false);
        if (hocLock) setLock(false);
        if (hocTransparent) setTransparent(false);
      };
    }, []);
    return <WrappedComponent {...(props as P)} />;
  };

  return ModalManageComponent;
};
