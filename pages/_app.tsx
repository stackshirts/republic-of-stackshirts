import React from 'react';
import 'src/styles/styles.scss';
import Link from 'next/link';
import Head from 'next/head';
import type { AppProps /*, AppContext */ } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>RofS</title>
      </Head>
      <nav className="navbar navbar-light bg-light container-fluid py-3 d-flex flex-row justify-content-between">
        <Link href="/">
          <a className="navbar-brand">
            republic-of-stackshirts
          </a>
        </Link>
      </nav>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
