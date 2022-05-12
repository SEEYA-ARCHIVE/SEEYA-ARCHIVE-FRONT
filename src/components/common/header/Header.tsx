import { useRouter } from 'next/router';
import React, { FC } from 'react';
import styled from 'styled-components';
import Icon from '../icon/Icon';

interface Props {}

export const Header: FC<Props> = () => {
  const router = useRouter();

  return (
    <HeaderWrapper>
      <Nav>
        <Icon
          name="iconTypoLogo"
          className="icon"
          onClick={() => {
            router.push('/');
          }}
        />
      </Nav>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  width: 100vw;
  height: 80px;

  display: flex;
  justify-content: center;

  position: fixed;
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

  .icon {
    cursor: pointer;
  }
`;
