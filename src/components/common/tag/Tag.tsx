import React, { FC } from 'react';
import styled from 'styled-components';

interface Props {
  text: string;
}

export const Tag: FC<Props> = ({ text }) => {
  return <Wrapper>{text}</Wrapper>;
};

const Wrapper = styled.div`
  background-color: #f5f5f5;
  color: #7b7b7b;
  border-radius: 9px;
  padding: 3px 8px;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;

  cursor: default;
`;
