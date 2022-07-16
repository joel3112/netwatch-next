import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { appWithRedux } from '@/hoc/appWithRedux';
import { appWithTheme } from '@/hoc/appWithTheme';
import { appWithBreakpoints } from '@/hoc/appWithBreakpoints';
import { appWithSWR } from '@/hoc/appWithSWR';
import { appWithRef } from '@/hoc/appWithRef';
import { Layout } from '@/containers/Layout';
import '@/styles/globals.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default appWithTranslation(
  appWithSWR(appWithRedux(appWithBreakpoints(appWithTheme(appWithRef(App)))))
);
