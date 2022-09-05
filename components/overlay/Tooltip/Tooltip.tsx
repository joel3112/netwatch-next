import { useState } from 'react';
import TooltipMUI from '@mui/material/Tooltip';
import { ElementChildren, ElementHTML } from '@/types';
import { classes } from '@/utils/helpers';
import styles from '@/components/overlay/Tooltip/Tooltip.module.scss';

export type TooltipProps = typeof defaultProps &
  ElementHTML &
  ElementChildren & {
    text: string;
  };

const defaultProps = {
  name: 'Tooltip'
};

const Tooltip = ({ className, children, text }: TooltipProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleTooltipChange = (enabled: boolean): void => setOpen(enabled);

  if (!text) return <div className={styles.content}>{children}</div>;

  return (
    <TooltipMUI
      title={text}
      classes={{ tooltip: classes(styles.wrapper, className) }}
      onClose={() => handleTooltipChange(false)}
      onOpen={() => handleTooltipChange(true)}
      onClick={() => handleTooltipChange(false)}
      open={open}
      PopperProps={{
        disablePortal: true
      }}
      arrow>
      <div className={styles.content}>{children}</div>
    </TooltipMUI>
  );
};

Tooltip.defaultProps = defaultProps;

export default Tooltip;
