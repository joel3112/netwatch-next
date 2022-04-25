import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { Container, Space } from '@/components/layout';

const Home: NextPage = () => {
  const { t } = useTranslation('home');

  return (
    <>
      <Head>
        <title>{t('head.title')}</title>
      </Head>

      <Container margins>
        <h1 className="wrapper">{t('welcome.title')}</h1>

        <Space direction="column" gap={20}>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ducimus id mollitia,
            perspiciatis quo repellendus! Alias, assumenda aut labore necessitatibus, neque non
            nulla placeat porro quos ratione sint tenetur vitae. Aliquam aperiam delectus dolorem,
            dolores est ex exercitationem facere minus, quam quasi quisquam quo quod voluptatum.
            Accusantium aperiam asperiores consequatur hic molestias natus neque nihil numquam,
            officiis praesentium repellat veniam! Ab aperiam autem beatae consectetur dolor dolorem
            doloremque eius error et expedita, ipsum iste laboriosam magni maiores nam
            necessitatibus porro qui quidem sapiente unde? Aspernatur optio placeat quasi
            repellendus totam. Aperiam asperiores cum delectus distinctio dolor doloribus eaque est
            excepturi explicabo facere fugiat incidunt, ipsam itaque iusto minus mollitia, obcaecati
            officia quidem repellat repellendus sequi suscipit ut veritatis vero voluptas? Accusamus
            aliquid consectetur, consequatur cumque deserunt dicta dolores, doloribus eaque fugit id
            incidunt nesciunt nihil obcaecati officiis optio recusandae reprehenderit sed soluta
            temporibus voluptatibus. Atque deleniti ipsam maxime molestiae sequi? Accusamus ad at
            consequatur corporis cumque distinctio, dolor eos fugit iste, maxime nesciunt odio quam
            qui quos reiciendis repellat sequi sunt! Accusamus commodi est hic id laudantium rerum
            similique vitae!
          </div>
          <div>
            Ab assumenda et hic illo molestias neque nihil odio officiis reiciendis, repellendus,
            repudiandae, tempora unde. Adipisci aliquid aut debitis dolor et in necessitatibus
            omnis, ullam? Aut facere illum porro repudiandae? Aliquam, aspernatur at, commodi
            consectetur distinctio ducimus eligendi et exercitationem facere in laborum magnam
            molestiae molestias neque nihil non perspiciatis placeat quo rem repellendus sint soluta
            tempora veniam veritatis voluptas? Autem consequatur corporis cum dolor eveniet,
            laboriosam sapiente vitae! Cum dolore ex hic ipsa odit officiis possimus, quae tempore
            voluptatem voluptatum? Deleniti harum illo odit quas quod ratione voluptatibus,
            voluptatum. Facere id libero molestias, nisi placeat vel? Amet asperiores, autem
            consequuntur dolor dolores explicabo fuga fugiat, incidunt iste magnam mollitia natus
            odio quam quo tempora veniam vero! Dolorem, nam, quae.
          </div>
          <div>
            Ab iusto nobis tenetur voluptatibus. Cum earum hic iste minima, molestiae quibusdam
            reiciendis rem temporibus. Ab facere iure labore laboriosam qui sequi vero. Ea et
            molestiae officia placeat praesentium repudiandae! A accusamus asperiores atque
            eligendi, est eum, eveniet excepturi in iusto libero maiores minus nihil placeat
            quibusdam reiciendis, sint soluta ut velit vero voluptate? Eius ipsa nam odit quam ut.
            Accusantium architecto culpa cum deleniti iure laboriosam minus nulla officiis optio
            provident quaerat quia rem repellendus sunt tempora unde, veniam vitae. Explicabo rem,
            voluptatem! Dolore doloribus ex libero nihil suscipit. Adipisci amet at autem,
            consequatur consequuntur, delectus dolor dolorem enim explicabo ipsum modi omnis quas,
            quia recusandae sint soluta sunt ullam veritatis voluptate voluptates. Dolorem laborum
            perferendis porro qui vero. A ad officia quisquam sapiente tenetur! Accusamus assumenda
            at, atque aut consequatur cumque deserunt dolor est, ex incidunt laborum minus nisi
            obcaecati odio officia placeat quam qui repellat suscipit tempora! Dolores iste quae
            quasi quia rem. Commodi cum hic illum maiores minima quam repellendus suscipit veniam
            voluptatibus voluptatum? Debitis doloribus illum laborum porro ullam. Ad aspernatur
            earum incidunt. Cumque, suscipit? A alias, aliquam aperiam aspernatur culpa, dolore
            eligendi est exercitationem facere iusto laborum molestias omnis quis repellat sit
            tenetur vero. Adipisci cumque, deserunt dicta dolorum illo ipsam nam quasi ratione.
          </div>
        </Space>
      </Container>
    </>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home']))
    }
  };
}

export default Home;
