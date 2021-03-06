import React, { FC, useState } from 'react';
import Lottie from 'react-lottie';
import styled from 'styled-components';

import MainLogo from 'public/assets/lottie/mainLottie.json';

interface Props {}

const lottieOptions = {
  animationData: MainLogo,
  loop: true,
  autoplay: true,
};

export const MainLottie: FC<Props> = () => {
  return (
    <Wrapper>
      <Lottie options={lottieOptions} width={700} height={700}></Lottie>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  right: 40px;
  top: 50px;
  z-index: 1;

  @media (max-width: ${1130}px) {
    display: none;
  }
`;
