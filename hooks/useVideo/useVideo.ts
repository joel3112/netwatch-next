import { useEffect, useState } from 'react';
import axios from 'axios';
import { MediaTypeKey, MediaVideoList } from '@/types';
import { useFetch } from '@/hooks/useFetch';
import { useI18n } from '@/hooks/useI18n';
import { videoTrailerId } from '@/utils/api';

export type UseVideo = {
  videoId: string;
  setVideoId: (videoId: string) => void;
};

const pathVideo = (type?: MediaTypeKey, id?: number): string | null => {
  if (type && id) return `/api/${type}/${id}/videos`;
  return null;
};
const fetcherVideo = (type?: MediaTypeKey, id?: number, language?: string) =>
  axios.get(`/api/${type}/${id}/videos`, { params: { language } }).then((res) => res.data);

export const useVideo = (
  mediaId?: number,
  mediaType?: MediaTypeKey,
  videoId?: string
): UseVideo => {
  const [state, setState] = useState<string>(videoId || '');
  const i18n = useI18n();

  const { data } = useFetch<MediaVideoList>(!videoId && pathVideo(mediaType, mediaId), () =>
    fetcherVideo(mediaType, mediaId, i18n.language)
  );

  useEffect(() => {
    if (data) {
      const videos = data as MediaVideoList;
      setState(videoTrailerId(videos, i18n.language));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, state]);

  return { videoId: state, setVideoId: setState };
};
