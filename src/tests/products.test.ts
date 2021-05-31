import glob from 'glob';
import fs from 'fs-extra';
import yaml from 'js-yaml';
import { ProductSchema } from 'src/schemas';
import { ProductType } from 'src/types';

describe('All products parse', () => {

  const filenames = glob.sync('public/api/products/**/*.json')
    // .slice(0, 1);

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
