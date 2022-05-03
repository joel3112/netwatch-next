import axios from 'axios';
import { useTranslation } from 'next-i18next';
import { ElementChildren, ElementHTML } from '@/types';
import { MediaData, MediaTypeKey } from '@/types/media';
import { ScrollToState } from '@/redux/modules/scrollTo';
import { useRedux } from '@/hooks/useRedux';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { useFetchPagination } from '@/hooks/useFetchPagination';
import { MediaGrid } from '@/containers/MediaGrid';
import { Grid, Space } from '@/components/layout';
import { Button } from '@/components/forms';
import { classes } from '@/utils/helpers';
import styles from '@/containers/MediaPagination/MediaPagination.module.scss';

export type MediaPaginationProps = typeof defaultProps &
  ElementHTML &
  ElementChildren & {
    mediaKey: MediaTypeKey;
  };

const defaultProps = {};

const itemPlaceholder = {
  id: 9999,
  name: 'placeholder media name',
  date: '9999-99-99'
};

const fetcher = (url: string) => {
  return axios.get(url).then((res) => res.data);
};

const MediaPagination = ({ mediaKey }: MediaPaginationProps) => {
  const { t } = useTranslation();
  const { state } = useRedux('scrollTo');
  const { container } = state as ScrollToState;
  const { getBreakpointRuleBy } = useBreakpoint();
  const spacings = getBreakpointRuleBy('spacing');

  const {
    data: mediasPerPage,
    onLoadMore,
    loading,
    paginationEnd
  } = useFetchPagination<MediaData>(
    `/api/${mediaKey}`,
    (...args) => fetcher(args[0] as string),
    20,
    itemPlaceholder
  );

  const handleLoadMore = () => {
    setTimeout(() => {
      container && container.scrollTo({ top: container.scrollTop + 500, behavior: 'smooth' });
    }, 500);
    onLoadMore();
  };

  return (
    <div className={classes(styles.wrapper)}>
      {mediasPerPage && (
        <Grid gap={5} spacing={spacings}>
          {mediasPerPage.map((items, index) => (
            <Grid.Item key={index}>
              <MediaGrid items={items} />
            </Grid.Item>
          ))}
        </Grid>
      )}

      {!loading && !paginationEnd && (
        <Space justify="center" className={styles.more}>
          <Button onClick={handleLoadMore}>{t('list.load.more')}</Button>
        </Space>
      )}
    </div>
  );
};

MediaPagination.defaultProps = defaultProps;

export default MediaPagination;
