import type { AppProps } from 'next/app';
import styled, { ThemeProvider } from 'styled-components';

import { GlobalStyle } from 'src/styles/global-style';
import { theme } from 'src/styles/theme';
import { RecoilRoot } from 'recoil';
import { Modal } from 'src/components/common/modal/Modal';

export default function App({ Component, pageProps }: AppProps) {
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
  max-width: 1280px;
  height: 100vh;
  margin: auto;
  background-color: ${({ theme }) => theme.color.white};
`;
