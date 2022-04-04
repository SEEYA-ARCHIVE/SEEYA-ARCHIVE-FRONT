import React, { FC } from 'react';
import { colorType } from 'src/types/commonType';
import styled, { css } from 'styled-components';

interface Props {
  bgColor: colorType;
  position?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  value: string;
}

export const FABButton: FC<Props> = ({ bgColor, position, value }) => {
  return (
    <FABWrapper bgColor={bgColor} position={position}>
      {value}
    </FABWrapper>
  );
};

const FABWrapper = styled.button<Pick<Props, 'bgColor' | 'position'>>`
  position: fixed;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${({ theme, bgColor }) => theme.color[bgColor]};

  ${({ position }) =>
    position &&
    css`
      top: ${position.top ?? 0}px;
      right: ${position.right ?? 0}px;
      bottom: ${position.bottom ?? 0}px;
      left: ${position.left ?? 0}px;
    `}
`;
