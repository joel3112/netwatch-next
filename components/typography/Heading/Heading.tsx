import { createElement, HTMLAttributes } from 'react';
import cn from 'classnames';
import { ElementChildren, ElementHTML, ElementSkeleton } from '@/types';
import { withSkeleton } from '@/hoc/withSkeleton';
import styles from '@/components/typography/Heading/Heading.module.scss';

export const HeadingSize = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6'
};

export type HeadingProps = Partial<typeof defaultProps> &
  ElementHTML &
  ElementChildren<string> &
  ElementSkeleton & {
    level?: keyof typeof HeadingSize;
    ellipsis?: boolean;
  };

const defaultProps = {
  level: 2
};

const Heading = ({ className, children, level, ellipsis }: HeadingProps) => {
  const Element = ({ ...props }: HTMLAttributes<HTMLHeadingElement>) =>
    createElement(HeadingSize[level || 2], props, children);

  return (
    <Element className={cn(styles.wrapper, className, ellipsis && styles.ellipsis)}>
      {children}
    </Element>
  );
};

Heading.defaultProps = defaultProps;

const HeadingWithSkeleton = withSkeleton<HeadingProps>(Heading, { variant: 'heading' });

export default HeadingWithSkeleton;
