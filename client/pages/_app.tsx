import { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';

import Layout from '../layout';
import { wrapper } from '../store/store';
import { client } from '../api';

import '../global.scss';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Reddit</title>
      </Head>
      <ApolloProvider client={client}>
        <Layout>
          <>
            <Component {...pageProps} />
          </>
        </Layout>
      </ApolloProvider>
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
