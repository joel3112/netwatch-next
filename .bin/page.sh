read -p "- Enter page name: " name

path="pages/$name"
pathTest="__tests__/$name"
namePage=$(sed '
          h;
          y/quvwxzdermatoglyphicsbfjkn/QUVWXZDERMATOGLYPHICSBFJKN/;
          G;
          s/\(.\)[^\n]*\n.\(.*\)/\1\2/;
        ' <<<$name)

mkdir -p $path
mkdir -p $pathTest

# ------------------------------------------------------------- #
# Page test
# ------------------------------------------------------------- #

echo "import { render, screen } from '@testing-library/react';
import $namePage from '@/pages/$name/$namePage';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

describe('Tests $name page', () => {
  test('renders page correctly', () => {
    render(<$namePage />);

    expect(screen.getByText('$name Page')).toBeInTheDocument();
	});
});" > "$pathTest/index.test.tsx"

echo "- Page created successfully in $path"
