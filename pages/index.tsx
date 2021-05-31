import React from 'react';
import Link from 'next/link';

const Index = () => {

  return (
    <div className="container main">

      <h1 className="display-3 font-weight-bold">
        Stackshirts for the People
      </h1>
      <Link href="/products">
        <a>
          Check out products
        </a>
      </Link>

    </div>
  );
};

export default Index;
