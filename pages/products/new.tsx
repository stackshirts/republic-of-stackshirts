import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import ProductForm from 'src/components/ProductForm/ProductForm';
import { ProductType } from 'src/types';
import { nowAsFormattedTimestamp } from 'src/utils/timestamps';

const makeProduct = (): ProductType => {
  return {
    id: '',
    type: 'products',
    attributes: {
      createdOn: nowAsFormattedTimestamp(),
      updatedOn: nowAsFormattedTimestamp(),
      name: '',
      logos: [],
      colors: [],
      package: {},
      url: '',
      githubUrl: '',
    },
    relationships: {
      productLabels: {}
    }
  }
}

const New: React.FC = () => {

  const router = useRouter()

  return (
    <div>
      <div className="navbar container-fluid border-bottom border-top py-2 d-flex flex-row justify-content-between">
        <div>
          <Link href="/products">
            <a>
              products
            </a>
          </Link>
          {' > '}
          new product
        </div>
        <div>
          <Link href="/products">
            <a>
              cancel
            </a>
          </Link>
        </div>
      </div>

      <div className="container main">

        <h1 className="h1">
          New product
        </h1>

        <ProductForm
          product={makeProduct()}
          onSubmit={async (formValues) => {
            const { data: updatedProduct } = await axios.post(`/api/products`, formValues)
            await router.push(`/products/${updatedProduct.id}`)
          }}
        />
      </div>
    </div>
  );
}

export default New
