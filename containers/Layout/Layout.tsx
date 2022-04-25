import React from 'react';
import cn from 'classnames';
import { ElementChildren } from '@/types';
import { Container, Header } from '@/components/layout';
import styles from '@/containers/Layout/Layout.module.scss';

export type LayoutProps = typeof defaultProps & ElementChildren;

const defaultProps = {};

const Layout = ({ children }: LayoutProps) => {
  const [container, setContainer] = React.useState<HTMLDivElement | null>();

  console.log(container);

  return (
    <div className={cn(styles.layoutWrapper)} ref={setContainer}>
      <header className={styles.header}>
        <Container>
          <Header href="/" title="Netwatch" logoUrl="/assets/images/logo-light.png" />
        </Container>
      </header>

      <main className={styles.main}>{children}</main>
    </div>
  );
};

Layout.defaultProps = defaultProps;

export default Layout;
