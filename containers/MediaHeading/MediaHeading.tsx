import { ElementChildren, ElementHTML, ElementLink, ElementSkeleton } from '@/types';
import { Space } from '@/components/layout';
import { FiChevronRight } from 'react-icons/fi';
import { withNavigation } from '@/hoc/withNavigation';
import { withSkeleton } from '@/hoc/withSkeleton';
import { Heading } from '@/components/typography';
import { classes } from '@/utils/helpers';
import styles from '@/containers/MediaHeading/MediaHeading.module.scss';

export type MediaHeadingProps = typeof defaultProps &
  ElementHTML &
  ElementChildren<string> &
  ElementSkeleton &
  ElementLink;

const defaultProps = {};

const MediaHeading = ({ className, children, skeleton, href }: MediaHeadingProps) => {
  return (
    <Space justify="between" align="center" gap={20} className={classes(styles.wrapper, className)}>
      <Space align="center">
        <Heading skeleton={skeleton} level={3}>
          {children}
        </Heading>

        {href && <FiChevronRight className={styles.icon} />}
      </Space>
    </Space>
  );
};

MediaHeading.defaultProps = defaultProps;

const MediaHeadingWithNavigation = withNavigation<MediaHeadingProps>(MediaHeading);
const MediaHeadingWithSkeleton = withSkeleton<MediaHeadingProps>(MediaHeadingWithNavigation, {
  variant: 'heading'
});

export default MediaHeadingWithSkeleton;
