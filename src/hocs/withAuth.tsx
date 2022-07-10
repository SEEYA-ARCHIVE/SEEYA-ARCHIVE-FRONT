import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { userSessionState } from 'src/stores/user';

const withAuth =
  <T extends any>(Component: React.FC<T> | NextPage<T>): React.FC<T> =>
  // eslint-disable-next-line react/display-name
  (props) => {
    const router = useRouter();
    const userSession = useRecoilValue(userSessionState);

    if (!userSession) {
      router.replace('/');
      return null;
    }

    return <Component {...props} />;
  };

export default withAuth;
