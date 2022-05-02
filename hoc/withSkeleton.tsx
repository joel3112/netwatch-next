/* eslint-disable react/display-name */
import { ElementChildren, RectangleRatio } from '@/types';
import { SkeletonVariant } from '@/components/feedback/Skeleton/Skeleton';
import { Skeleton } from '@/components/feedback';

type WithSkeletonProps = ElementChildren &
  RectangleRatio & {
    skeleton?: boolean;
  };

interface WithSkeletonConfig<T> {
  variant?: SkeletonVariant;
  component?: (x: T) => JSX.Element;
}

export const withSkeleton =
  <T extends WithSkeletonProps>(Component: (x: T) => JSX.Element, config?: WithSkeletonConfig<T>) =>
  ({ children, ...hocProps }: T) => {
    const { skeleton, width, height, ratio } = hocProps;
    const { variant, component: SkeletonComponent } = config || {};

    if (!skeleton) {
      return <Component {...(hocProps as T)}>{children}</Component>;
    }

    if (SkeletonComponent) {
      return <SkeletonComponent {...(hocProps as T)} />;
    }

    return (
      <Skeleton width={width} height={height} ratio={ratio} variant={variant}>
        <Component {...(hocProps as T)}>{children}</Component>
      </Skeleton>
    );
  };
