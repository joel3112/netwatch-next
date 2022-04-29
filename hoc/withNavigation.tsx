/* eslint-disable react/display-name */
import Link from 'next/link';
import { ElementChildren, ElementLink } from '@/types';

type WithNavigationProps = ElementChildren & ElementLink;

export const withNavigation =
  <T extends WithNavigationProps>(Component: (x: T) => JSX.Element) =>
  ({ children, ...hocProps }: T) => {
    const { href } = hocProps;

    if (!href) {
      return <Component {...(hocProps as T)}>{children}</Component>;
    }

    return (
      <Link href={href}>
        <a>
          <Component {...(hocProps as T)}>{children}</Component>
        </a>
      </Link>
    );
  };
