import { useEffect, useState } from 'react';
import { FunctionVoid } from '@/types';

type PortalOnChangeProp = FunctionVoid<boolean>;

export type UseModal = {
  isOpened: boolean;
  handleChange: PortalOnChangeProp;
};

export type UseModalHook = (opened: boolean, onChange: PortalOnChangeProp) => UseModal;

export const useModal: UseModalHook = (opened: boolean, onChange: PortalOnChangeProp) => {
  const [isOpened, setIsOpened] = useState<boolean>(opened);

  useEffect(() => {
    setIsOpened(opened);
  }, [opened]);

  const handleChange = (enabled: boolean) => {
    setIsOpened(enabled);
    onChange && onChange(enabled);
  };

  return {
    isOpened,
    handleChange
  };
};
