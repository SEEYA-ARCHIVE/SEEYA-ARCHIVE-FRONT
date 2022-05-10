import React, { FC } from 'react';
import useModal from 'src/hooks/useModal';
import styled, { css } from 'styled-components';

interface Props {
  backgroundBlur?: boolean;
  backgroundLock?: boolean;
  backgroundTransparent?: boolean;
}

export const ModalHOC = <P extends object>(WrappedComponent: React.ComponentType<P>): FC<Props & P> => {
  const ModalManageComponent = ({ backgroundBlur, backgroundLock, backgroundTransparent, ...props }: Props) => {
    const { closeCurrentModal } = useModal();

    const onClickModalBackground = () => {
      if (backgroundLock) return;

      closeCurrentModal();
    };

    return (
      <>
        <Background
          onClick={onClickModalBackground}
          backgroundBlur={backgroundBlur}
          backgroundTransparent={backgroundTransparent}
        />
        <Content>
          <WrappedComponent {...(props as P)} />
        </Content>
      </>
    );
  };

  return ModalManageComponent;
};

const Background = styled.div<Pick<Props, 'backgroundTransparent' | 'backgroundBlur'>>`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: ${({ backgroundTransparent }) => (backgroundTransparent ? 'transparent' : 'rgba(123, 123, 123, 0.75);')};

  ${({ backgroundBlur }) =>
    backgroundBlur &&
    css`
      backdrop-filter: blur(20px);
    `};
`;

const Content = styled.div`
  position: absolute;
  z-index: 1001;
`;
