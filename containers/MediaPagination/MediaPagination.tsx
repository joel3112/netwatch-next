import { useEffect } from 'react';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'next-i18next';
import { ElementChildren, ElementHTML, MediaData, MediaTypeKey } from '@/types';
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
  const { ref, inView } = useInView();
  const { itemSpacings } = useBreakpoint();

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

  useEffect(() => {
    if (!loading && !paginationEnd) {
      inView && onLoadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div className={classes(styles.wrapper)}>
      {mediasPerPage && (
        <Grid gap={5} spacing={itemSpacings}>
          {mediasPerPage.map((items, index) => (
            <Grid.Item key={index}>
              <MediaGrid items={items} />
            </Grid.Item>
          ))}
        </Grid>
      )}

      <div ref={ref} className={classes(styles.visor)}></div>

      {!loading && !paginationEnd && false && (
        <Space justify="center" className={styles.more}>
          <Button onClick={onLoadMore}>{t('list.load.more')}</Button>
        </Space>
      )}
    </div>
  );
};

MediaPagination.defaultProps = defaultProps;

export default MediaPagination;
