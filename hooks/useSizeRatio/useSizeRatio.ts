import { useEffect, useState } from 'react';
import { Rectangle, RectangleRatio, Size } from '@/types';
import { modifierRatio, validateSize } from '@/utils/helpers';

export type UseSizeRatio = Required<Rectangle>;

export const useSizeRatio = ({ width, height, ratio }: RectangleRatio): UseSizeRatio => {
  const [sizes, setSizes] = useState<Rectangle>({});

  useEffect(() => {
    if (width && height) {
      setSizes({ width, height });
    } else {
      height && setSizes({ width: modifierRatio('width', height, ratio) });
      width && setSizes({ width, height: modifierRatio('height', width, ratio) });
    }
  }, [width, height, ratio]);

  return {
    width: validateSize(sizes.width as Size),
    height: validateSize(sizes.height as Size)
  };
};
