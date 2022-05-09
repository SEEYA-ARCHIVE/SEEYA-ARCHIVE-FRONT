import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import styled, { ThemeProvider } from 'styled-components';
import { RecoilRoot } from 'recoil';
import { useRouter } from 'next/router';

import { GlobalStyle } from 'src/styles/global-style';
import { theme } from 'src/styles/theme';
import { Modal } from 'src/components/common/modal/Modal';
import { pageview } from 'src/utils/gtag';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
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
    <>
      <RecoilRoot>
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
    </>
  );
}

const Wrap = styled.div`
  background-color: rgb(0, 14, 86);
  height: 100vh;
`;
const Layout = styled.div`
  position: relative;
  max-width: 1280px;
  height: 100vh;
  margin: auto;
  background-color: ${({ theme }) => theme.color.white};
`;
