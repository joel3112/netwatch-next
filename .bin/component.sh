read -p "- Enter component name: " name

path="components/$name"
classname=$(sed '
       h;
       y/QUVWXZDERMATOGLYPHICSBFJKN/quvwxzdermatoglyphicsbfjkn/;
       G;
       s/\(.\)[^\n]*\n.\(.*\)/\1\2/;
     ' <<<$name)

mkdir -p $path

# ------------------------------------------------------------- #
# Component
# ------------------------------------------------------------- #

echo "import { useState, useRef } from 'react';
import cn from 'classnames';
import { ElementChildren, ElementHTML } from '@/types';
import styles from '@/components/$name/$name.module.scss';

export type ${name}Props = typeof defaultProps &
  ElementHTML &
  ElementChildren & {
    name: string;
  };

const defaultProps = {
  name: '$name'
};

const $name = ({ className, children, name }: ${name}Props) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      {name} component
      {children}
    </div>
  );
};

$name.defaultProps = defaultProps;

export default $name;" > "$path/$name.tsx"

# ------------------------------------------------------------- #
# Component test
# ------------------------------------------------------------- #

echo "import { render, screen } from '@testing-library/react';
import $name from '@/components/$name/$name';

describe('Tests $name component', () => {
  test('renders component correctly', () => {
    const { container } = render(<$name>Test</$name>);

    expect(container).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    render(<$name>Test</$name>);

    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});" > "$path/$name.test.tsx"

# ------------------------------------------------------------- #
# Component styles
# ------------------------------------------------------------- #

echo ".wrapper {
  display: block;
}" > "$path/$name.module.scss"

echo "- Component created successfully in $path"
