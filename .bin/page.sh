read -p "- Enter page name: " name

path="pages/$name"
pathTest="__tests__/"
pathLocales="public/locales/es-ES"
namePage=$(sed '
          h;
          y/quvwxzdermatoglyphicsbfjkn/QUVWXZDERMATOGLYPHICSBFJKN/;
          G;
          s/\(.\)[^\n]*\n.\(.*\)/\1\2/;
        ' <<<$name)

mkdir -p $path
mkdir -p $pathTest
mkdir -p $pathLocales

# ------------------------------------------------------------- #
# Page
# ------------------------------------------------------------- #

echo "import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

const $namePage: NextPage = () => {
  const { t } = useTranslation('$name');

  return (
    <>
      <Head>
        <title>{t('head.title')}</title>
      </Head>

      <main>
        <h1>$name page</h1>
      </main>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', '$name']))
  }
});

export default $namePage;" > "pages/$name.tsx"

# ------------------------------------------------------------- #
# Page i18n
# ------------------------------------------------------------- #

echo "{
  \"head.title\": \"$namePage - Netwatch\"
}" > "$pathLocales/$name.json"


# ------------------------------------------------------------- #
# Page test
# ------------------------------------------------------------- #

echo "import { render, screen } from '@testing-library/react';
import $namePage from '@/pages/$name';

describe('Tests $name page', () => {
  test('renders page correctly', () => {
    const { container } = render(<$namePage />);

    expect(container).toMatchSnapshot();
	});
});" > "$pathTest/$name.test.tsx"

echo "- Page created successfully in $path"
