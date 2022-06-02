import { AppProps } from 'next/app';
import Head from 'next/head';

import '../global.scss';

import { Providers } from '../context';
import Layout from '../layout';
import { wrapper } from '../store/store';
import { Dialogs } from '../components/dialogs';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Reddit</title>
      </Head>
      <Providers>
        <Layout>
          <>
            <Component {...pageProps} />
            <Dialogs />
          </>
        </Layout>
      </Providers>
    </>
  );
}

// MyApp.getInitialProps = wrapper.getInitialAppProps(store => async ({ ctx, Component }) => {
//   try {
//     const { data } = useMeQuery();
//     if (data?.me) {
//       store.dispatch(setMe(data.me));
//     }
//   } catch (err) {
//     console.log(err);
//   }

//   return {
//     pageProps: Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {},
//   };
// });

export default wrapper.withRedux(MyApp);
