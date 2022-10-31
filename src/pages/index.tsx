import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'
import styles from './home.module.scss'

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  console.log(product);

  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for month</span>
          </p>
          <SubscribeButton />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getServersideProps: GetServerSideProps = async () => {

  const price = await stripe.prices.retrieve('price_1Lz6kdHIbphT2DjQY3NKEa9D', {
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: price.unit_amount,
  }

  console.log("product");

  return {
    props: {
      product,
    }
  }
}
