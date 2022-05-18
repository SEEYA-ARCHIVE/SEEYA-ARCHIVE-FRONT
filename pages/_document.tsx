import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';

import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Noto+Sans+KR:wght@400;700&family=Poppins:wght@200&display=swap"
            rel="stylesheet"
          />

          <meta name="title" content="시야 아카이브" />
          <meta
            name="description"
            content="콘서트를 기다리고 있나요? 어떤 좌석의 시야가 더 좋을지 이곳에서 탐색하세요"
          />
          <meta name="keywords" content="콘서트를 기다리고 있나요? 어떤 좌석의 시야가 더 좋을지 이곳에서 탐색하세요" />
          <meta name="google-site-verification" content="z1PJVdEX220aDxq8R-oT3EKoakeKRDj1_MQd9Al-fLQ" />
          <meta name="naver-site-verification" content="06240e2015927f1bccf43619220f322b8ee5136c" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.seeya-archive.com" />
          <meta property="og:title" content="시야 아카이브" />
          <meta
            property="og:description"
            content="콘서트를 기다리고 있나요? 어떤 좌석의 시야가 더 좋을지 이곳에서 탐색하세요"
          />
          <meta
            property="og:image"
            content="https://7th-team2-seeya-archive.s3.ap-northeast-2.amazonaws.com/common/og-image.png"
          />
          <meta property="twitter:card" content="summary" />
          <meta property="twitter:title" content="시야 아카이브" />
          <meta property="twitter:description" content="최적의 자리에서 최애를 영접할 수 있도록 도와드립니다." />
          <meta
            property="twitter:image"
            content="https://7th-team2-seeya-archive.s3.ap-northeast-2.amazonaws.com/common/og-image.png"
          />
          <link rel="canonical" href="https://www.seeya-archive.com/" />

          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`}></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS_ID}');
          `,
            }}
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `(function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:'${process.env.NEXT_PUBLIC_HOTJAR_ID}',hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
