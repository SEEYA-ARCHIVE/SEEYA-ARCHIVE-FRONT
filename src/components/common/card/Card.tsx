import React, { FC } from 'react';
import styled from 'styled-components';

interface Props {
  onClick?: () => void | Promise<void>;
  className?: string;
}
export const Card: FC<Props> = ({ onClick, className, children }) => {
  return (
    <CardWrapper onClick={onClick} className={className}>
      {children}
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  width: 217px;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
`;
