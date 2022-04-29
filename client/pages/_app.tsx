import { AppProps } from 'next/app';
import Head from 'next/head';

import '../global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap'
          rel='stylesheet'
        />
        <title>Reddit</title>
      </Head>
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
