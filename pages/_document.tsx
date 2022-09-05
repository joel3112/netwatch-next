import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html>
      <Head>
        <link rel="shortcut icon" type="image/png" href="/assets/images/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
