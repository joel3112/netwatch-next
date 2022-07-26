/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useRef, useEffect, useMemo, ChangeEvent } from 'react';
import axios from 'axios';
import { AutocompleteState, createAutocomplete, GetSources } from '@algolia/autocomplete-core';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { FunctionGeneric, MediaData } from '@/types';
import { useI18n } from '@/hooks/useI18n';
import { Input } from '@/components/forms';
import { Image } from '@/components/media';
import { Space } from '@/components/layout';
import { classes } from '@/utils/helpers';
import styles from '@/containers/MediaAutocomplete/MediaAutocomplete.module.scss';

function debouncePromise(fn: FunctionGeneric, time: number) {
  let timerId: unknown = undefined;

  return function debounced(...args: unknown[]) {
    if (timerId) {
      clearTimeout(timerId as number);
    }

    return new Promise((resolve) => {
      timerId = setTimeout(() => resolve(fn(...args)), time);
    });
  };
}

const debounced = debouncePromise((items: unknown) => Promise.resolve(items), 400);

/* -------------------------------------------------------------------------- */
/** MediaAutocompleteItem (child component) **/
/* -------------------------------------------------------------------------- */

type MediaAutocompleteItemProps = {
  selected: boolean;
  href: string;
  name: string;
  image: string;
  date: string;
  onClick: () => void;
};

const MediaAutocompleteItem = ({
  selected,
  href,
  name,
  image,
  date,
  onClick
}: MediaAutocompleteItemProps) => {
  const handleClick = () => onClick && onClick();

  return (
    <Link href={href}>
      <a
        role="button"
        className={classes(styles.autocompleteItem, selected && styles.selected)}
        onClick={handleClick}>
        <div className={styles.image}>
          <Image src={image} alt="item" ratio={1.5} />
        </div>

        <Space direction="column" gap={5}>
          <span className={styles.name}>{name.truncate(70)}</span>
          {date && <span className={styles.date}>{date}</span>}
          <div className={styles.enter}>
            <BsArrowReturnLeft />
          </div>
        </Space>
      </a>
    </Link>
  );
};

/* -------------------------------------------------------------------------- */
/** MediaAutocomplete (main component) **/
/* -------------------------------------------------------------------------- */

export type MediaAutocompleteProps = typeof defaultProps & {
  onClose?: () => void;
};

const defaultProps = {};

type MediaAutocompleteState = Partial<AutocompleteState<MediaData>> & {
  isLoading: boolean;
};

const MediaAutocomplete = ({ onClose }: MediaAutocompleteProps) => {
  const truncateLength = 5;
  const formRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const { t } = useI18n();
  const [autocompleteState, setAutocompleteState] = useState<MediaAutocompleteState>({
    isOpen: false,
    isLoading: false
  });

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        (inputRef.current as HTMLInputElement).focus();
      }
    }, 100);
  }, []);

  useEffect(() => {
    if (Number(autocompleteState.activeItemId) >= truncateLength) {
      setAutocompleteState((prev) => ({
        ...prev,
        activeItemId: Number(prev.activeItemId) % truncateLength
      }));
    }
  }, [autocompleteState.activeItemId]);

  const getSources = () => {
    return debounced([
      {
        sourceId: 'results',
        getItemUrl: ({ item }: { item: MediaData }) => `/${item.type}/${item.id}`,
        getItems: ({ query }: { query: string }) => {
          setAutocompleteState((prev) => ({ ...prev, isLoading: true }));

          return axios.get(`/api/search?query=${query}`).then(({ data }) => {
            setAutocompleteState((prev) => ({ ...prev, isLoading: false }));
            return data.results;
          });
        }
      }
    ]);
  };

  const autocomplete = useMemo(
    () =>
      createAutocomplete<MediaData, ChangeEvent<HTMLInputElement>>({
        id: 'autocomplete',
        placeholder: t('header.action.search.placeholder'),
        onStateChange: ({ state }) => {
          setAutocompleteState(state as MediaAutocompleteState);
        },
        autoFocus: true,
        getSources: getSources as unknown as GetSources<MediaData>
      }),
    [t]
  );

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current
  });
  const inputProps = autocomplete.getInputProps({
    icon: FiSearch,
    inputElement: inputRef.current
  });

  const InputSearch = () => {
    return (
      <div className={classes(styles.autocompleteInput)}>
        <Input name="search" ref={inputRef} className={styles.input} {...inputProps} />
      </div>
    );
  };

  const handleItemSelect = () => {
    setAutocompleteState((prev) => ({ ...prev, isOpen: false }));
    onClose && onClose();
  };

  return (
    <div className={classes(styles.wrapper)}>
      <form className={styles.autocompleteForm} ref={formRef} {...(formProps as unknown)}>
        {InputSearch()}

        {autocompleteState.status === 'loading' && (
          <div className={styles.message}>{t('header.action.search.loading')}</div>
        )}

        {autocompleteState.status === 'idle' &&
        (!autocompleteState.collections?.length ||
          !autocompleteState.collections[0].items?.length) ? (
          <div className={styles.message}>{t('header.action.search.no.results')}</div>
        ) : (
          ''
        )}

        {autocompleteState.status === 'idle' && autocompleteState.collections?.length ? (
          <div ref={panelRef} {...(autocomplete.getPanelProps() as unknown)}>
            {autocompleteState.collections &&
              autocompleteState.collections.map((collection, index) => {
                const { items } = collection;

                return (
                  <section key={`section-${index}`}>
                    {items.length > 0 && (
                      <ul className={styles.autocompleteResult} {...autocomplete.getListProps()}>
                        {items.truncate(truncateLength).map((item: MediaData, index: number) => {
                          const id = `autocomplete-item-${index}`;

                          return (
                            <li
                              key={item.id}
                              id={id}
                              onClick={onClose}
                              onMouseEnter={() =>
                                setAutocompleteState((prev) => ({
                                  ...prev,
                                  activeItemId: index
                                }))
                              }>
                              <MediaAutocompleteItem
                                href={`/${item.type}/${item.id}`}
                                selected={autocompleteState.activeItemId === index}
                                onClick={handleItemSelect}
                                name={item.name}
                                image={item.image}
                                date={item.date || ''}
                              />
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </section>
                );
              })}
          </div>
        ) : (
          ''
        )}
      </form>
    </div>
  );
};

MediaAutocomplete.defaultProps = defaultProps;

export default MediaAutocomplete;
