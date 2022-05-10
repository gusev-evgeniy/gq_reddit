import { AppProps } from 'next/app';
import Head from 'next/head';

import '../global.scss';

import { Providers } from '../context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Reddit</title>
      </Head>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </>
  );
}

export default MyApp;
