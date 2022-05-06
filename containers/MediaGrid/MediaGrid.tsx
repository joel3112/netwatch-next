import { IoMdAdd } from 'react-icons/io';
import { ElementHTML, ElementSkeleton } from '@/types';
import { MediaData } from '@/types';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { Grid } from '@/components/layout';
import { Card } from '@/components/display';
import { classes } from '@/utils/helpers';
import styles from '@/containers/MediaGrid/MediaGrid.module.scss';

export type MediaGridProps = typeof defaultProps &
  ElementHTML &
  ElementSkeleton & {
    items: Array<MediaData>;
  };

const defaultProps = {};

const MediaGrid = ({ items }: MediaGridProps) => {
  const { itemSpacings, itemBreakpoints } = useBreakpoint();

  return (
    <div className={styles.wrapper}>
      <Grid gap={5} spacing={itemSpacings} className={classes(styles.grid)}>
        {items.map(({ image, name, date, type }, index) => (
          <Grid.Item key={index} {...itemBreakpoints}>
            <Card href="/home" className={styles.card} skeleton={!type}>
              <Card.Image src={image} width="100%" ratio={1.5}>
                <Card.Actions>
                  <Card.Actions.Item icon={IoMdAdd} />
                </Card.Actions>
              </Card.Image>
              <Card.Body title={name} description={date} />
            </Card>
          </Grid.Item>
        ))}
      </Grid>
    </div>
  );
};

MediaGrid.defaultProps = defaultProps;

export default MediaGrid;
