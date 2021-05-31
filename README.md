# Republic of Stackshirts

## How to work

- `yarn dev` to start the nextjs app
- Go to [https://localhost:3111](https://localhost:3111)
- Add/update products, logos, productLabels
- We deploy to vercel on the `master` branch:
  - `.vercelignore` ignores `/pages/api` (which we only use in dev)
  - And points all `/api` requests to the `/public/api` folder, mapping to JSON files
  - svgs live in `/public/static`
  

