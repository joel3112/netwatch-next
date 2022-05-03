import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { appWithRedux } from '@/hoc/appWithRedux';
import { appWithTheme } from '@/hoc/appWithTheme';
import { appWithBreakpoints } from '@/hoc/appWithBreakpoints';
import { appWithSWR } from '@/hoc/appWithSWR';
import { Layout } from '@/containers/';
import '@/styles/globals.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="app">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
};

export default appWithTranslation(appWithSWR(appWithRedux(appWithBreakpoints(appWithTheme(App)))));
