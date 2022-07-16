import { Suspense, useEffect } from 'react';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { useRouter } from 'next/router';
import styled, { ThemeProvider } from 'styled-components';
import { MutableSnapshot, RecoilRoot } from 'recoil';

import { GlobalStyle } from 'src/styles/global-style';
import { theme } from 'src/styles/theme';
import { Modal } from 'src/components/common/modal/Modal';
import { pageview } from 'src/utils/gtag';
import { UserType } from 'src/types/api/user';
import { initAxiosConfig } from 'src/api/axios';
import { getUserAPI } from 'src/api/user';
import { userSessionState } from 'src/stores/user';

initAxiosConfig();

interface Props extends AppProps {
  userSession?: UserType;
}

export default function MyApp({ Component, pageProps, userSession }: Props) {
  const router = useRouter();
  const recoilInitializer = ({ set }: MutableSnapshot) => {
    if (userSession) {
      set(userSessionState, userSession);
    }
  };

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  return (
    <Suspense fallback={<></>}>
      <RecoilRoot initializeState={recoilInitializer}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Wrap>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Wrap>
          <Modal />
        </ThemeProvider>
      </RecoilRoot>
    </Suspense>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const user = await getUserAPI();

  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, userSession: user };
};

const Wrap = styled.div`
  height: 100vh;
`;
const Layout = styled.div`
  position: relative;
  max-width: 1280px;
  height: 100vh;
  margin: auto;
  background-color: ${({ theme }) => theme.color.white};
`;
