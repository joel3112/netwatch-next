import { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import { MediaData } from '@/types';
import { actions, FavouriteState } from '@/redux/modules/favourite';
import { useRedux } from '@/hooks/useRedux';
import { useI18n } from '@/hooks/useI18n';
import { getPropValue } from '@/utils/helpers';

export type UseFavourite = {
  items: MediaData[];
  isFavourite: (id: number) => boolean;
  favouriteAction: (id: number) => string;
  FavouriteIcon: (id: number) => IconType | null;
  onAdd: (item: MediaData) => void;
  onRemove: (item: MediaData) => void;
  onToggle: (e: UIEvent, item: MediaData) => void;
};

export const useFavourite = (): UseFavourite => {
  const { t } = useI18n('common');
  const { state, dispatch } = useRedux('favourite');
  const items = getPropValue(state as FavouriteState, 'items', []) as MediaData[];
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  const handleAdd = (item: MediaData): void => {
    dispatch(actions.add(item));
  };

  const handleRemove = (item: MediaData): void => {
    dispatch(actions.remove(item));
  };

  const handleToggle = (e: UIEvent, item: MediaData): void => {
    e.preventDefault();
    if (isFavourite(item.id)) {
      handleRemove(item);
    } else {
      handleAdd(item);
    }
  };

  const isFavourite = (id: number): boolean => {
    return items.some((i) => i.id === id);
  };

  const getFavouriteAction = (id: number): string => {
    if (isSSR) {
      return '';
    }
    return isFavourite(id) ? t('favourites.remove') : t('favourites.add');
  };

  const getFavouriteIcon = (id: number): IconType | null => {
    if (isSSR) {
      return IoMdAdd;
    }
    return isFavourite(id) ? IoMdRemove : IoMdAdd;
  };

  return {
    items: isSSR ? [] : items,
    favouriteAction: getFavouriteAction,
    FavouriteIcon: getFavouriteIcon,
    onAdd: handleAdd,
    onRemove: handleRemove,
    onToggle: handleToggle,
    isFavourite
  };
};
