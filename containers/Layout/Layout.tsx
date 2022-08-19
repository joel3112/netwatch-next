import { useState } from 'react';
import { ElementChildren } from '@/types';
import { useScroll } from '@/hooks/useScroll';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { useI18n } from '@/hooks/useI18n';
import { Header } from '@/containers/Header';
import { Container } from '@/components/layout';
import { classes } from '@/utils/helpers';
import styles from '@/containers/Layout/Layout.module.scss';

export type LayoutProps = typeof defaultProps & ElementChildren;

const defaultProps = {};

const Layout = ({ children }: LayoutProps) => {
  useI18n();
  const { key } = useBreakpoint();
  const [container, setContainer] = useState<HTMLDivElement | null>();
  const { onScroll } = useScroll(container as HTMLDivElement);

  return (
    <div className={classes(styles.wrapper, styles[key])} ref={setContainer} onScroll={onScroll}>
      <header className={styles.header}>
        <Container>
          <Header />
        </Container>
      </header>

      <main className={styles.main}>{children}</main>
    </div>
  );
};

Layout.defaultProps = defaultProps;

export default Layout;
