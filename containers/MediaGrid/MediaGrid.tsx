import { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { ElementHTML } from '@/types';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { Grid } from '@/components/layout';
import { Card } from '@/components/display';
import { classes } from '@/utils/helpers';
import { mockMedias } from '@/data/';
import styles from '@/containers/MediaGrid/MediaGrid.module.scss';

type MediaItem = {
  id: number;
  poster_path: string;
};

export type MediaGridProps = typeof defaultProps &
  ElementHTML & {
    mediaKey: 'movie' | 'tv';
  };

const defaultProps = {};

const MediaGrid = ({ mediaKey }: MediaGridProps) => {
  const [items, setItems] = useState<Array<MediaItem>>([]);
  const { getBreakpointRuleBy } = useBreakpoint();
  const spacings = getBreakpointRuleBy('spacing');
  const itemsPerRow = getBreakpointRuleBy('items');

  useEffect(() => {
    if (mediaKey) {
      setItems(mockMedias[mediaKey]);
    }
  }, [mediaKey]);

  return (
    <div className={styles.wrapper}>
      <Grid gap={5} spacing={spacings} className={classes(styles.grid)}>
        {items.map((item) => (
          <Grid.Item key={item.id} {...itemsPerRow}>
            <Card href="/home" className={styles.card}>
              <Card.Image
                src={'https://image.tmdb.org/t/p/w500' + item.poster_path}
                width="100%"
                ratio={1.5}>
                <Card.Actions>
                  <Card.Actions.Item icon={IoMdAdd} />
                </Card.Actions>
              </Card.Image>
            </Card>
          </Grid.Item>
        ))}
      </Grid>
    </div>
  );
};

MediaGrid.defaultProps = defaultProps;

export default MediaGrid;
