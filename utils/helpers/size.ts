import { Size } from '@/types';

const widthRatio = (size: Size, ratio: number): Size =>
  typeof size === 'number' ? size / ratio : size;

const heightRatio = (size: Size, ratio: number): Size =>
  typeof size === 'number' ? size * ratio : size;

export const modifierRatio = (type: 'width' | 'height', size: Size, ratio?: number): Size => {
  if (ratio) {
    if (type === 'width') {
      return widthRatio(size, ratio);
    }

    if (type === 'height') {
      return heightRatio(size, ratio);
    }
  }

  return size;
};

export const validateSize = (size: Size): Size => {
  if (typeof size === 'number') {
    return `${size}px`;
  }

  return size;
};
