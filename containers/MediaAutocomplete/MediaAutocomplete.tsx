import { useState, useRef } from 'react';
import { ElementChildren, ElementHTML } from '@/types';
import { classes } from '@/utils/helpers';
import styles from '@/containers/MediaAutocomplete/MediaAutocomplete.module.scss';

export type MediaAutocompleteProps = typeof defaultProps &
  ElementChildren & {
    query: string;
  };

const defaultProps = {
  query: ''
};

const MediaAutocomplete = ({ children, query }: MediaAutocompleteProps) => {
  return (
    <div className={classes(styles.wrapper)}>
      Query: {query}
      {children}
    </div>
  );
};

MediaAutocomplete.defaultProps = defaultProps;

export default MediaAutocomplete;
