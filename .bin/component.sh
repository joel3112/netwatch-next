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

echo "import React from 'react';
import cn from 'classnames';
import styles from '@/components/$name/$name.module.scss';

export type ${name}Props = ReactComponent<{
  name: string;
}>;

const defaultProps: Partial<${name}Props> = {
  name: '$name'
};

const $name = ({ className, name }: ${name}Props) => {
  return (
    <div className={cn(styles.${classname}Wrapper, className, 'wrapper')}>
      {name} component
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

echo ".${classname}Wrapper {
  display: block;
}" > "$path/$name.module.scss"

echo "- Component created successfully in $path"
