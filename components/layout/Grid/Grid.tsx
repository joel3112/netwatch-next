import { createContext, useContext, useMemo } from 'react';
import { ResponsiveStyleValue } from '@mui/system';
import { GridSize, GridSpacing } from '@mui/material/Grid/Grid';
import GridMUI from '@mui/material/Grid';
import { ElementChildren, ElementHTML } from '@/types';
import { withChildrenFiltered } from '@/hoc/withChildrenFiltered';
import { classes } from '@/utils/helpers';
import styles from '@/components/layout/Grid/Grid.module.scss';

/* -------------------------------------------------------------------------- */
/** Context **/
/* -------------------------------------------------------------------------- */

type GridContextProps = typeof defaultValue;

const defaultValue = {};

const GridContext = createContext<GridContextProps>(defaultValue);

const useGridContext = () => useContext(GridContext);

/* -------------------------------------------------------------------------- */
/** GridItem (child component) **/
/* -------------------------------------------------------------------------- */

type GridItemProps = ElementHTML &
  ElementChildren<JSX.Element> & {
    xs?: boolean | GridSize;
    sm?: boolean | GridSize;
    md?: boolean | GridSize;
    lg?: boolean | GridSize;
    xl?: boolean | GridSize;
  };

const GridItem = ({ children, className, xs, sm, md, lg, xl }: GridItemProps) => {
  useGridContext();

  return (
    <GridMUI
      item
      className={classes(styles.item, className)}
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}>
      {children}
    </GridMUI>
  );
};

/* -------------------------------------------------------------------------- */
/** Grid (main component) **/
/* -------------------------------------------------------------------------- */

export type GridProps = typeof defaultProps &
  ElementHTML &
  ElementChildren<Array<JSX.Element>> & {
    itemsPerRow?: number;
    spacing?: ResponsiveStyleValue<GridSpacing> | Array<ResponsiveStyleValue<GridSpacing>>;
  };

const defaultProps = {
  children: [],
  itemsPerRow: 1,
  spacing: 0.5
};

const Grid = ({ children, className, spacing }: GridProps) => {
  const rowSpacing = useMemo(() => (Array.isArray(spacing) ? spacing[0] : spacing), [spacing]);
  const columnSpacing = useMemo(() => (Array.isArray(spacing) ? spacing[1] : spacing), [spacing]);

  return (
    <GridContext.Provider value={{}}>
      <GridMUI
        role="grid"
        className={classes(styles.wrapper, className)}
        columns={60}
        container
        rowSpacing={rowSpacing as ResponsiveStyleValue<GridSpacing>}
        columnSpacing={columnSpacing as ResponsiveStyleValue<GridSpacing>}>
        {children}
      </GridMUI>
    </GridContext.Provider>
  );
};

Grid.defaultProps = defaultProps;

const GridWithChildrenFiltered = withChildrenFiltered(Grid, { Item: GridItem });

export default GridWithChildrenFiltered;
