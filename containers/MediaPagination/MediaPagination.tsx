import { useEffect } from 'react';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { ElementChildren, ElementHTML, MediaData, MediaTypeKey } from '@/types';
import { useI18n } from '@/hooks/useI18n';
import { useFetchPagination } from '@/hooks/useFetchPagination';
import { MediaGrid } from '@/containers/MediaGrid';
import { Space } from '@/components/layout';
import { Button } from '@/components/forms';
import { classes } from '@/utils/helpers';
import styles from '@/containers/MediaPagination/MediaPagination.module.scss';

export type MediaPaginationProps = typeof defaultProps &
  ElementHTML &
  ElementChildren & {
    mediaType: MediaTypeKey;
  };

const defaultProps = {};

const fetcher = (url: string) => {
  return axios.get(url).then((res) => res.data);
};

const MediaPagination = ({ mediaType }: MediaPaginationProps) => {
  const { t } = useI18n();
  const { ref, inView } = useInView();

  const {
    data: itemsPerPage,
    onLoadMore,
    loading,
    paginationEnd
  } = useFetchPagination<MediaData>(
    `/api/${mediaType}`,
    (...args) => fetcher(args[0] as string),
    20
  );

  useEffect(() => {
    if (inView) {
      inView && onLoadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div className={classes(styles.wrapper)}>
      {itemsPerPage && <MediaGrid items={itemsPerPage} />}

      <div ref={ref} className={classes(styles.visor)}></div>

      {!loading && !paginationEnd && (
        <Space justify="center" className={styles.more}>
          <Button secondary onClick={onLoadMore}>
            {t('list.load.more')}
          </Button>
        </Space>
      )}
    </div>
  );
};

MediaPagination.defaultProps = defaultProps;

export default MediaPagination;
