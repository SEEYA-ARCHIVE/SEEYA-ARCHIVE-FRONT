import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from 'src/styles/global-style';
import { theme } from 'src/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
