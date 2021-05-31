import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

export const getStaticProps = async () => {
  const fs = require('fs-extra')
  const productIds = fs.readdirSync('public/api/products').map((file: string) => file.split('.').shift())
  return {
    props: {
      productIds
    }
  }
}

const Products: React.FC<{ productIds: string[] }> = (props) => {

  const {
    productIds,
  } = props

  return (
    <>
      <Head>
        <title>RofS - All products</title>
      </Head>
      <div className="navbar container-fluid border-bottom border-top py-2 d-flex flex-row justify-content-between">
        <span>
          products
        </span>
        <span>
          <Link href="/products/new">
            <a>
              new
            </a>
          </Link>
        </span>
      </div>

      <div className="container main">
        <h1>
          Pick your poison
        </h1>
        <ul>
          {productIds.map((productId) => {
            return (
              <li key={productId}>
                <Link href={`/products/${productId}`}>
                  <a>
                    {productId}
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  );
};

export default Products;
