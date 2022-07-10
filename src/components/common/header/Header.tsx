import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { userSessionState } from 'src/stores/user';
import styled from 'styled-components';
import Icon from '../icon/Icon';

interface Props {}

export const Header: FC<Props> = () => {
  const router = useRouter();
  const userSession = useRecoilValue(userSessionState);

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
        <AuthMenu>
          {userSession ? (
            <>
              <HeaderButton>LOG OUT</HeaderButton>
              <HeaderButton>MY PAGE</HeaderButton>
            </>
          ) : (
            <HeaderButton
              onClick={() => {
                router.push('/auth');
              }}>
              LOG IN
            </HeaderButton>
          )}
        </AuthMenu>
      </Nav>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  width: 100vw;
  height: 80px;

  display: flex;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 1;
`;

const Nav = styled.nav`
  width: 100%;
  height: 100%;
  max-width: 1280px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 20px;

  .icon {
    cursor: pointer;
  }
`;

const AuthMenu = styled.div`
  display: flex;
  align-items: center;

  gap: 15px;
`;

const HeaderButton = styled.button`
  padding: 2px 10px;
  border-radius: 132px;
  text-transform: uppercase;

  background-color: ${({ theme }) => theme.color.white};
  color: #376f77;
  border: 1px solid #688f95;
`;
