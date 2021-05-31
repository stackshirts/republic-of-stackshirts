import fs from 'fs-extra'
import {
  NextApiRequest,
  NextApiResponse
} from 'next';
import { foundProduct } from 'pages/api/products/[productId]';
import revisionHash from 'rev-hash';
import { ProductSchema } from 'src/schemas';
import { makePathnameAndSrc } from 'src/utils/logoUtils';
import { nowAsFormattedTimestamp } from 'src/utils/timestamps';

export default async (req: NextApiRequest, res: NextApiResponse) => {

  switch (req.method) {
    case 'POST': {
      const product = req.body
      product.attributes.createdOn = nowAsFormattedTimestamp()
      product.attributes.updatedOn = nowAsFormattedTimestamp()

      ProductSchema.parse(product)
      if (foundProduct(product.id)) {
        throw new Error('product-exists-already')
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
      res.send('That endpoint does not exist yet')
    }
  }
}
