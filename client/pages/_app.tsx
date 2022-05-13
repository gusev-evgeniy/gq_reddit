import { AppProps } from 'next/app';
import Head from 'next/head';

import '../global.scss';

import { Providers } from '../context';
import Layout from '../layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Reddit</title>
      </Head>
      <Providers>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
    </>
  );
}

export default MyApp;
