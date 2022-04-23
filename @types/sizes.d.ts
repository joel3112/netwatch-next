import { Basic } from '@/types';

declare global {
  namespace RCProps {
    type Size = string | number;

    interface Rectangle {
      width?: Size;
      height?: Size;
    }

    type WithSize<T> = T & Sizes.Rectangle & Basic;
  }
}
