import fs from 'fs'
import gs from 'glob-stream'
import algoliasearch from 'algoliasearch'

require('dotenv').config({
  path: './.env.production'
});

process.on('unhandledRejection', e => { throw e })

if (!process.env.ALGOLIA_APP_ID || !process.env.ALGOLIA_API_KEY) {
  throw Error('You are missing some environment variables')
}

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY,
);

const index = client.initIndex('products');
const stream = gs('public/api/products/*.json', { /* options */ });

let objects: any[] = [];
stream
  .on('data', ({ path }: { path: string }) => {
    const resource = JSON.parse(fs.readFileSync(path, 'utf8'));
    objects.push({
      ...resource,
      objectID: resource.id,
    });
    if (objects.length === 10000) {
      stream.pause();
      index
        .saveObjects(objects, { autoGenerateObjectIDIfNotExist: false })
        .then(() => {
          objects = [];
          stream.resume();
        })
        .catch(console.error);
    }
  })
  .on('end', () => {
    if (objects.length) {
      index.saveObjects(objects, {
        autoGenerateObjectIDIfNotExist: true
      })
        .catch(console.error)
        .then(() => console.log('Upload to Algolia completed'));
    }
  })
  .on('error', (err: Error) => console.error(err));
