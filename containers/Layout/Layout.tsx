import React from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { ElementChildren } from '@/types';
import { Container, Header } from '@/components/layout';
import styles from '@/containers/Layout/Layout.module.scss';

export type LayoutProps = typeof defaultProps & ElementChildren;

const defaultProps = {};

const Layout = ({ children }: LayoutProps) => {
  const { t } = useTranslation();
  const [container, setContainer] = React.useState<HTMLDivElement | null>();

  // TODO: use container to manage scroll
  console.log(container);

  return (
    <div className={cn(styles.layoutWrapper)} ref={setContainer}>
      <header className={styles.header}>
        <Container>
          <Header href="/" title={t('application.name')} logoUrl="/assets/images/logo-light.png" />
        </Container>
      </header>

      <main className={styles.main}>{children}</main>
    </div>
  );
};

Layout.defaultProps = defaultProps;

export default Layout;
