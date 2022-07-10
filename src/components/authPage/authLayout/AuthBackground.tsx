import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Img } from 'src/components/common/image/Img';

interface Props {}

export const AuthBackground: FC<Props> = () => {
  return (
    <Wrapper>
      <Img name="AuthImage" width={800} height={734} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: -40px;

  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;
