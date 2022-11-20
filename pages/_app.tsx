import { Suspense, useEffect } from 'react';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { useRouter } from 'next/router';
import styled, { ThemeProvider } from 'styled-components';
import { MutableSnapshot, RecoilRoot } from 'recoil';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { GlobalStyle } from 'src/styles/global-style';
import { theme } from 'src/styles/theme';
import { Modal } from 'src/components/common/modal/Modal';
import { pageview } from 'src/utils/gtag';
import { UserType } from 'src/types/api/user';
import { initAxiosConfig } from 'src/api/axios';
import { getUserAPI } from 'src/api/user';
import { userSessionState } from 'src/stores/user';
import axios from 'axios';
import { ROUTE } from 'src/route';

import { setUpMocks } from '../src/api/mock/index';

setUpMocks();

initAxiosConfig();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      useErrorBoundary: true,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

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
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<></>}>
        <RecoilRoot initializeState={recoilInitializer}>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <Wrap bgColor={BACKGROUND_COLOR_SETTING[router.asPath]}>
              <Layout bgColor={BACKGROUND_COLOR_SETTING[router.asPath]}>
                <Component {...pageProps} />
              </Layout>
            </Wrap>
            <Modal />
          </ThemeProvider>
        </RecoilRoot>
      </Suspense>
    </QueryClientProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const { ctx } = appContext;

  const cookie = ctx.req ? ctx.req.headers.cookie : null;

  let user;
  if (cookie) {
    axios.defaults.headers.common['cookie'] = cookie;

    user = await getUserAPI();
  }

  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, userSession: user };
};

const BACKGROUND_COLOR_SETTING = {
  [ROUTE.HOME]: 'white',
  [ROUTE.SEAT]: 'white',
  [ROUTE.SEAT_COMPARE]: 'white',
  [ROUTE.UPLOAD]: 'skyblue',
};

const Wrap = styled.div<{ bgColor?: string }>`
  height: 100vh;
  background-color: ${({ theme, bgColor }) => theme.color[bgColor ?? 'white']};
`;
const Layout = styled.div<{ bgColor?: string }>`
  position: relative;
  max-width: 1280px;
  height: 100vh;
  margin: auto;
`;
