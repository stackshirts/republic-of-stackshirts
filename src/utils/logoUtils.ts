import { ProductType } from 'src/types';

export const makePathnameAndSrc = (product: ProductType, name: string, hash: string): { pathname: string, src: string } => {
  const pathname = `/static/logos/${product.id}/${name}.${hash}.svg`
  return {
    pathname,
    src: new URL(pathname, 'https://www.republicofstackshirts.com').href
  }
}
