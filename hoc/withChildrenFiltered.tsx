/* eslint-disable react/display-name */
import { ComponentType, useEffect, useState } from 'react';
import { ElementChildren, FunctionGeneric, ObjectGeneric } from '@/types';

type WithChildrenFilteredProps = ElementChildren<JSX.Element | Array<JSX.Element>>;

const decorateHOCWithStaticProps = (hoc: FunctionGeneric) => {
  return function execHOC<T extends WithChildrenFilteredProps>(
    Component: ComponentType<T>,
    compounds: ObjectGeneric
  ) {
    const c = hoc(Component, compounds);

    Object.entries(compounds).forEach(([name, component]) => {
      c[name] = component;
    });

    return c;
  };
};

export const withChildrenFiltered = decorateHOCWithStaticProps(
  <T extends WithChildrenFilteredProps>(
      Component: (x: T) => JSX.Element,
      compounds: { [name: string]: ComponentType<T> }
    ) =>
    ({ children, ...hocProps }: T) => {
      const [filteredChildren, setFilteredChildren] = useState<Array<JSX.Element>>([]);

      const isComponentFiltered = (child: JSX.Element) => {
        return (
          child.type &&
          Object.keys(compounds).find((key) => child.type.name === compounds[key].name)
        );
      };

      useEffect(() => {
        if (children) {
          if (Array.isArray(children)) {
            setFilteredChildren(children.filter(isComponentFiltered));
          } else {
            setFilteredChildren(isComponentFiltered(children) ? [children] : []);
          }

          [children].flat().forEach((child: JSX.Element) => {
            if (!isComponentFiltered(child)) {
              const compoundsExpected = Object.keys(compounds)
                .map((key) => (compounds[key] as ComponentType).name)
                .join(', ');
              throw new Error(
                `${Component.name} children must be ${compoundsExpected}, received ${child.type}`
              );
            }
          });
        }
      }, [children]);

      return <Component {...(hocProps as T)}>{filteredChildren}</Component>;
    }
);
