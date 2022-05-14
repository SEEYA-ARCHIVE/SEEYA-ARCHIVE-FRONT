import React, { FC } from 'react';
import { ColorType } from 'src/types/commonType';
import styled, { css } from 'styled-components';
import Icon from '../icon/Icon';

interface Props {
  bgColor: ColorType;
  position?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  value: string;
  className?: string;
  onClick?: () => void;
}

export const FABButton: FC<Props> = ({ bgColor, position, value, className, onClick }) => {
  return (
    <FABWrapper bgColor={bgColor} position={position} className={className} onClick={onClick}>
      <div>
        <Icon name="iconComment" />
      </div>
      {value}
    </FABWrapper>
  );
};

const FABWrapper = styled.button<Pick<Props, 'bgColor' | 'position'>>`
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: none;
  background-color: ${({ theme, bgColor }) => theme.color[bgColor]};

  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.white};

  ${({ position }) =>
    css`
      ${position?.top && `top: ${position.top}px;`}
      ${position?.right && `right: ${position.right}px;`}
      ${position?.bottom && `bottom: ${position.bottom}px;`}
      ${position?.left && `left: ${position.left}px;`}
    `}
`;
