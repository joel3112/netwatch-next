import { createContext, useContext, useMemo } from 'react';
import { ResponsiveStyleValue } from '@mui/system';
import { GridSpacing } from '@mui/material/Grid/Grid';
import GridMUI from '@mui/material/Grid';
import { Breakpoints, BreakpointSpacing, ElementChildren, ElementHTML } from '@/types';
import { withChildrenFiltered } from '@/hoc/withChildrenFiltered';
import { classes, mapValuesBy } from '@/utils/helpers';
import styles from '@/components/layout/Grid/Grid.module.scss';

/* -------------------------------------------------------------------------- */
/** Context **/
/* -------------------------------------------------------------------------- */

type GridContextProps = typeof defaultValue & {
  breakpoints?: Breakpoints;
};

const defaultValue = {};

const GridContext = createContext<GridContextProps>(defaultValue);

const useGridContext = () => useContext(GridContext);

/* -------------------------------------------------------------------------- */
/** GridItem (child component) **/
/* -------------------------------------------------------------------------- */

type GridItemProps = ElementHTML & ElementChildren<JSX.Element>;

const GridItem = ({ children, className }: GridItemProps) => {
  const { breakpoints } = useGridContext();

  return (
    <GridMUI item className={classes(styles.item, className)} {...breakpoints}>
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
    spacing?: BreakpointSpacing;
    breakpoints: Breakpoints;
  };

const defaultProps = {
  children: [],
  itemsPerRow: 1,
  spacing: 0.5
};

const Grid = ({ children, className, spacing, breakpoints }: GridProps) => {
  const rowSpacing = useMemo(() => (Array.isArray(spacing) ? spacing[0] : spacing), [spacing]);
  const columnSpacing = useMemo(() => (Array.isArray(spacing) ? spacing[1] : spacing), [spacing]);
  const columns = 20;

  return (
    <GridContext.Provider
      value={{
        breakpoints: mapValuesBy(breakpoints, (value) => columns / (value as number))
      }}>
      <GridMUI
        role="grid"
        className={classes(styles.wrapper, className)}
        columns={columns}
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
