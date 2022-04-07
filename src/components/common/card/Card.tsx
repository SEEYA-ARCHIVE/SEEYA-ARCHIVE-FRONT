import React, { FC } from 'react';
import styled from 'styled-components';

interface Props {}

export const Card: FC<Props> = ({ children }) => {
  return <CardWrapper>{children}</CardWrapper>;
};

const CardWrapper = styled.div`
  width: 217px;
  min-height: 305px;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
`;
