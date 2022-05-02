import axios from 'axios';
import { IoMdAdd } from 'react-icons/io';
import { ElementHTML, MediaData, MediaTypeKey } from '@/types';
import { useFetch } from '@/hooks/useFetch';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { Grid } from '@/components/layout';
import { Card } from '@/components/display';
import { classes } from '@/utils/helpers';
import styles from '@/containers/MediaGrid/MediaGrid.module.scss';

export type MediaGridProps = typeof defaultProps &
  ElementHTML & {
    mediaKey: MediaTypeKey;
  };

const defaultProps = {};

const itemPlaceholder = {
  name: 'placeholder media name',
  date: '9999-99-99'
};

const fetcher = (mediaKey: MediaTypeKey) => axios.get('/api/' + mediaKey).then((res) => res.data);

const MediaGrid = ({ mediaKey }: MediaGridProps) => {
  const { getBreakpointRuleBy } = useBreakpoint();
  const { data: items, loading } = useFetch<Array<MediaData>>(
    '/api/' + mediaKey,
    () => fetcher(mediaKey),
    20,
    itemPlaceholder
  );

  return (
    <div className={styles.wrapper}>
      {items && !items.isEmpty() && (
        <Grid gap={5} spacing={getBreakpointRuleBy('spacing')} className={classes(styles.grid)}>
          {items.map(({ id, image, name, date }) => (
            <Grid.Item key={id} {...getBreakpointRuleBy('items')}>
              <Card href="/home" className={styles.card} skeleton={loading}>
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
      )}
    </div>
  );
};

MediaGrid.defaultProps = defaultProps;

export default MediaGrid;
