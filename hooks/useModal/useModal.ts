import { useEffect, useState } from 'react';
import { FunctionVoid } from '@/types';

export type UseModal = {
  isOpened: boolean;
  handleChange: FunctionVoid<boolean>;
};

export type UseModalHook = (opened?: boolean, onChange?: FunctionVoid<boolean>) => UseModal;

export const useModal: UseModalHook = (opened?: boolean, onChange?: FunctionVoid<boolean>) => {
  const [isOpened, setIsOpened] = useState<boolean | undefined>(opened);

  useEffect(() => {
    setIsOpened(opened);
  }, [opened]);

  const handleChange = (enabled: boolean) => {
    setIsOpened(enabled);
    onChange && onChange(enabled);
  };

  return {
    isOpened: Boolean(isOpened),
    handleChange
  };
};
