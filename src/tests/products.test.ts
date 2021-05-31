import fs from 'fs-extra';
import glob from 'glob';
import { ProductSchema } from 'src/schemas';

describe('All products parse', () => {

  const filenames = glob.sync('public/api/products/**/*.json')

  filenames.forEach((filename) => {
    it(filename, async () => {

      const product = fs.readJSONSync(filename);
      ProductSchema.parse(product)
      // yamlString = yaml.dump(product, {
      //   'styles': {
      //     '!!null': 'canonical' // dump null as ~
      //   },
      // });
    });
  });
});
