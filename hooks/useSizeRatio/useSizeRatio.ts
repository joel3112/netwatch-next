import { useEffect, useState } from 'react';
import { Rectangle, Size } from '@/types';
import utils from '@/utils/helpers';

export type UseSizeRatio = Rectangle & {
  ratio?: number;
};

export type UseSizeRatioHook = (x: UseSizeRatio) => Required<Rectangle>;

export const useSizeRatio: UseSizeRatioHook = ({ width, height, ratio }) => {
  const [sizes, setSizes] = useState<Rectangle>({});

  useEffect(() => {
    if (width && height) {
      setSizes({ width, height });
    } else {
      height && setSizes({ width: utils.modifierRatio('width', height, ratio) });
      width && setSizes({ width, height: utils.modifierRatio('height', width, ratio) });
    }
  }, [width, height, ratio]);

  return {
    width: utils.validateSize(sizes.width as Size),
    height: utils.validateSize(sizes.height as Size)
  };
};
