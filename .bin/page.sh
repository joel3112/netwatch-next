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

# ------------------------------------------------------------- #
# Page
# ------------------------------------------------------------- #

echo "import type { NextPage } from 'next';
import Head from 'next/head';

const $namePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>$namePage - Netwatch</title>
      </Head>      

      <main>
        $name page
      </main>
    </>
  );
};

export default $namePage;" > "$path/index.tsx"

# ------------------------------------------------------------- #
# Page test
# ------------------------------------------------------------- #

echo "import { render, screen } from '@testing-library/react';
import $namePage from '@/pages/$name/$namePage';

describe('Tests $name page', () => {
  test('renders page correctly', () => {
    render(<$namePage />);

    expect(screen.getByText('$name Page')).toBeInTheDocument();
	});
});" > "$pathTest/index.test.tsx"

echo "- Page created successfully in $path"
