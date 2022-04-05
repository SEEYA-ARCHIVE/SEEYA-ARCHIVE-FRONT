import React, { FC } from 'react';
import { ColorType } from 'src/types/commonType';
import styled from 'styled-components';

interface Props {
  children: string;
  onClick?: () => void | Promise<void>;
  className?: string;
  bgColor: ColorType;
}

export const Button: FC<Props> = ({ children, onClick, className, bgColor }) => {
  return (
    <ButtonWrapper onClick={onClick} bgColor={bgColor} className={className}>
      {children}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div<Pick<Props, 'bgColor'>>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 6px 20px;
  height: 40px;
  border-radius: 25px;
  color: white;
  background-color: ${({ theme, bgColor }) => theme.color[bgColor]};
`;
