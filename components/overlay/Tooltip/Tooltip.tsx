import { useState } from 'react';
import TooltipMUI from '@mui/material/Tooltip';
import { ElementChildren, ElementHTML } from '@/types';
import styles from '@/components/overlay/Tooltip/Tooltip.module.scss';

export type TooltipProps = typeof defaultProps &
  ElementHTML &
  ElementChildren & {
    text: string;
  };

const defaultProps = {
  name: 'Tooltip'
};

const Tooltip = ({ children, text }: TooltipProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleTooltipChange = (enabled: boolean) => setOpen(enabled);

  return (
    <TooltipMUI
      title={text}
      classes={{ tooltip: styles.tooltipWrapper }}
      onClose={() => handleTooltipChange(false)}
      onOpen={() => handleTooltipChange(true)}
      onClick={() => handleTooltipChange(false)}
      open={open}
      PopperProps={{
        disablePortal: true
      }}
      arrow>
      <div className={styles.tooltipContent}>{children}</div>
    </TooltipMUI>
  );
};

Tooltip.defaultProps = defaultProps;

export default Tooltip;
