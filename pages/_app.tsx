import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from 'src/styles/global-style';
import { theme } from 'src/styles/theme';
import { RecoilRoot } from 'recoil';
import { Modal } from 'src/components/Modal/Modal';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <Modal />
      </ThemeProvider>
    </RecoilRoot>
  );
}
