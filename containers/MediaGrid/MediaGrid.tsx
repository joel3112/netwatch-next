import { IoMdAdd } from 'react-icons/io';
import { BreakpointValues, ElementHTML, ElementSkeleton, MediaImageRatio } from '@/types';
import { MediaData } from '@/types';
import { Grid } from '@/components/layout';
import { Card } from '@/components/display';
import { classes, getBreakpointRuleBy } from '@/utils/helpers';
import styles from '@/containers/MediaGrid/MediaGrid.module.scss';

export type MediaGridProps = typeof defaultProps &
  ElementHTML &
  ElementSkeleton & {
    items: Array<MediaData>;
  };

const defaultProps = {};

const MediaGrid = ({ items }: MediaGridProps) => {
  const spacings = getBreakpointRuleBy('spacing') as BreakpointValues;
  const breakpoints = getBreakpointRuleBy('items') as BreakpointValues;

  return (
    <div className={styles.wrapper}>
      <Grid spacing={spacings} breakpoints={breakpoints} className={classes(styles.grid)}>
        {(items || []).map(({ id, image, type, name, date }, index) => (
          <Grid.Item key={index}>
            <Card
              href={{ pathname: '/[type]/[id]', query: { type, id } }}
              className={styles.card}
              skeleton={!type}>
              <Card.Image src={image} width="100%" ratio={MediaImageRatio.POSTER} lazy>
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
