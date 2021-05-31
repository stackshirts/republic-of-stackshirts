import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import ProductForm from 'src/components/ProductForm/ProductForm';
import { ProductType } from 'src/types';
import { convertTimestampToDate } from 'src/utils/timestamps';
import useSWR from 'swr';

require('firebase/firestore')


const ProductId: React.FC = () => {

  const router = useRouter();
  const { productId = null } = router.query
  const {
    data: product,
    error,
    mutate
  } = useSWR<ProductType, Error>(productId, async (productId) => axios.get(`/api/products/${productId}`).then(res => res.data))

  if (error) {
    return (
      <>
        <Head>
          <title>RofS - Product not found</title>
        </Head>
        <div className="navbar container-fluid border-bottom border-top py-2">
          <Link href="/products">
            <a>
              products
            </a>
          </Link>
        </div>
        <div className="center container-fluid py-6rem">
          Product not found
        </div>
      </>
    )
  }

  if (!product) {
    return null;
  }

  return (
    <>
      <Head>
        <title>RofS - ${product.attributes.name}</title>
      </Head>
      <div className="navbar container-fluid border-bottom border-top py-2">
        <Link href="/products">
          <a>
            products
          </a>
        </Link>
        {' > '}
        {product.id}
      </div>
      <div className="container main">
        <h1 className="h1">
          {product.attributes.name}
        </h1>

        <div className="mb-4">
          Created on: {convertTimestampToDate(product.attributes.createdOn)}
          <br />
          Updated on: {convertTimestampToDate(product.attributes.updatedOn)}
        </div>

        <ProductForm
          onSubmit={async (formValues ) => {
            const { data: updatedProduct } = await axios.post(`/api/products/${formValues?.id}`, formValues)
            await mutate(updatedProduct)
            return updatedProduct
          }}
          product={product}
        />

      </div>
    </>
  );
};

export default ProductId;
