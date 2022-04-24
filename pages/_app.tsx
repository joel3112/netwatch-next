import type { AppProps } from 'next/app';
import { Layout } from '@/containers';
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

export default App;
