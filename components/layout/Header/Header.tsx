import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';
import { ElementChildren, ElementHTML } from '@/types';
import { Space } from '@/components/layout';
import styles from '@/components/layout/Header/Header.module.scss';

export type HeaderProps = typeof defaultProps &
  ElementHTML &
  ElementChildren<JSX.Element | Array<JSX.Element>> & {
    title: string;
    href?: string;
    logoUrl?: string;
  };

const defaultProps = {
  href: '',
  logoUrl: '/assets/images/logo-light.png'
};

const Header = ({ children, title, href, logoUrl }: HeaderProps) => {
  return (
    <Space justify="between" align="center" className={cn(styles.headerWrapper)}>
      <Link href={href}>
        <a role="link">
          <Space align="center">
            <Image className={styles.logo} src={logoUrl} alt="logo" width={58} height={58} />

            <p className={styles.title}>{title}</p>
          </Space>
        </a>
      </Link>

      <Space align="center" gap={10}>
        {children}
      </Space>
    </Space>
  );
};

Header.defaultProps = defaultProps;

export default Header;
