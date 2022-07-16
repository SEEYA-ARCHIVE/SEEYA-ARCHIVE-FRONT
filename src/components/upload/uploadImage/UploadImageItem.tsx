import React, { FC } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  src?: string;
}

export const UploadedImageItem: FC<Props> = ({ src }) => {
  const isEmpty = !src;
  return <Wrap isEmpty={isEmpty}></Wrap>;
};

const Wrap = styled.div<{ isEmpty: boolean }>`
  width: 80px;
  height: 80px;
  border-radius: 2px;

  ${({ isEmpty }) =>
    isEmpty &&
    css`
      background-color: #688f95;
      opacity: 0.15;
    `}
`;
