import { IoMdAdd } from 'react-icons/io';
import { ElementHTML } from '@/types';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { Grid } from '@/components/layout';
import { Card } from '@/components/display';
import { classes } from '@/utils/helpers';
import { mockMovies } from '@/data/movies';
import styles from '@/containers/MediaGrid/MediaGrid.module.scss';

export type MediaGridProps = typeof defaultProps &
  ElementHTML & {
    items: Array<unknown>;
  };

const defaultProps = {
  items: mockMovies
};

const MediaGrid = ({ items }: MediaGridProps) => {
  const { getBreakpointRuleBy } = useBreakpoint();
  const spacings = getBreakpointRuleBy('spacing');
  const itemsPerRow = getBreakpointRuleBy('items');

  return (
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
  );
};

MediaGrid.defaultProps = defaultProps;

export default MediaGrid;
