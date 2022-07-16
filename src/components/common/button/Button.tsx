import React, { FC } from 'react';
import { ColorType } from 'src/types/commonType';
import styled, { css } from 'styled-components';

interface Props {
  onClick?: () => void | Promise<void>;
  className?: string;
  bgColor?: ColorType;
  color?: ColorType;
  borderColor?: ColorType;
  borderRadius?: string;
}

export const Button: FC<Props> = ({ children, onClick, className, bgColor, borderRadius, color, borderColor }) => {
  return (
    <ButtonWrapper
      onClick={onClick}
      bgColor={bgColor}
      className={className}
      color={color}
      borderRadius={borderRadius}
      borderColor={borderColor}>
      {children}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.button<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 0 20px;
  height: 40px;
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '25px')};
  background-color: ${({ theme, bgColor }) => (bgColor ? theme.color[bgColor] : 'white')};
  color: ${({ theme, color }) => (color ? theme.color[color] : 'white')};
  ${({ borderColor, theme }) =>
    borderColor &&
    css`
      border: 1px solid ${theme.color[borderColor]};
    `}
`;
