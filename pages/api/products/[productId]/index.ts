import fs from 'fs-extra'
import {
  NextApiRequest,
  NextApiResponse
} from 'next';
import revisionHash from 'rev-hash';
import CODES from 'src/CODES';
import { ProductSchema } from 'src/schemas';
import { makePathnameAndSrc } from 'src/utils/logoUtils';

export const foundProduct = (productId: string) => {
  const productPath = `public/api/products/${productId}.json`
  return fs.existsSync(productPath)
}

export const foundLogoPathname = (filePath: string) => {
  return fs.existsSync(filePath)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {

  switch (req.method) {
    case 'POST': {
      const product = req.body
      ProductSchema.parse(product)
      if (!foundProduct(product.id)) {
        throw new Error('product-does-not-exist')
      }
      for (const i in product.attributes.logos) {
        const { svg, ...logo } = product.attributes.logos[i]
        if (!svg) {
          continue // Then we don't have to bother saving a new svg, etc
        }
        const hash = revisionHash(svg)
        const {
          src,
          pathname,
        } = makePathnameAndSrc(product, logo.name, hash)
        const filePath = 'public' + pathname
        if (foundLogoPathname(filePath)) {
          throw new Error('logo-exists-already')
        }
        console.log('filePath, svg', filePath, svg)
        await fs.writeFile(filePath, svg, 'utf8')
        product.attributes.logos[i] = {
          ...logo,
          src,
          pathname,
        }
      }

      fs.writeJsonSync(`public/api/products/${product.id}.json`, product, {
        spaces: 2
      });
      res.send(product)
      break;
    }
    case 'GET':
    default: {
      try {
        const { productId } = req.query;
        const resource = require(`public/api/products/${productId}.json`);
        return res.json(resource);
      } catch (e) {
        return res.status(404).send(CODES.PRODUCT_NOT_FOUND)
      }
    }
  }
}
