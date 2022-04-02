import React, { VFC } from 'react';
import { useRecoilValue } from 'recoil';
import { modalBlurState, modalListState, modalLockState } from 'src/stores/modal';
import useModal from 'src/hooks/useModal';
import styled, { css } from 'styled-components';

export type ModalType = React.FC | React.VFC;
export interface IOptions {
  backgroundBlur?: boolean;
  backgroundLock?: boolean;
}

export const Modal: VFC = () => {
  const modalList = useRecoilValue(modalListState);
  const backgroundBlur = useRecoilValue(modalBlurState);
  const backgroundLock = useRecoilValue(modalLockState);
  const { closeCurrentModal } = useModal();

  const onClickModalBackground = () => {
    if (backgroundLock) return;

    closeCurrentModal();
  };

  return (
    <>
      {modalList.length > 0 && (
        <Wrapper>
          <Background onClick={onClickModalBackground} isBlur={backgroundBlur} />
          {modalList.map((Component, idx) => (
            <Content key={idx}>
              <Component />
            </Content>
          ))}
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const Background = styled.div<{ isBlur?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1000;

  ${({ isBlur }) =>
    isBlur &&
    css`
      background: rgba(123, 123, 123, 0.75);
      backdrop-filter: blur(20px);
    `}
`;

const Content = styled.div`
  position: absolute;
  z-index: 1001;
`;
