import React, { FC } from 'react';
import styled from 'styled-components';
import Icon from '../icon/Icon';

interface Props {}

export const Header: FC<Props> = () => {
  return (
    <HeaderWrapper>
      <Nav>
        <Icon name="iconTypoLogo" />
      </Nav>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  width: 100vw;
  height: 80px;

  display: flex;
  justify-content: center;

  position: absolute;
  top: 0;
  left: 0;
`;

const Nav = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1280px;

  display: flex;
  align-items: center;

  padding: 20px;
`;
