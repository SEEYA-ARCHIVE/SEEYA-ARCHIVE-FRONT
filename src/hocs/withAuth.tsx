import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useRecoilValue } from 'recoil';
import AlertModal from 'src/components/common/modal/AlertModal';
import useModal from 'src/hooks/useModal';
import { userSessionState } from 'src/stores/user';
import styled from 'styled-components';

const withAuth =
  <T extends any>(Component: React.FC<T> | NextPage<T>): React.FC<T> =>
  // eslint-disable-next-line react/display-name
  (props) => {
    const router = useRouter();

    const userSession = useRecoilValue(userSessionState);

    if (!userSession) {
      return (
        <Wrapper>
          <AlertModal color="blue5" mainMsg="로그인 후 이용 가능합니다." onClick={() => router.push('/auth')} />
        </Wrapper>
      );
    }

    return <Component {...props} />;
  };

export default withAuth;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;
