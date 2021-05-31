# Republic of Stackshirts

## How to work

- `yarn dev` to start the nextjs app
- Go to [https://localhost:3111](https://localhost:3111)
- Add/update products, logos, productLabels
- We deploy to vercel on the `master` branch:
  - `.vercelignore` ignores `/pages/api` (which we only use in dev)
  - And points all `/api` requests to the `/public` folder, mapping to JSON files
  - svgs live in `/public/static`
  

## To do
- [x] Create a ProductForm component that validates with zod and displays error
- [x] Make logos into cards
- [x] Add logo in a card
- [x] Check if the logo name is already taken
- [x] Mutate cache for product after adding logo
- [x] Mutate cache for product after updating product
- [x] Disable name field
- [x] Add color
- [x] Add error tooltip to color form
- [x] Cancel to remove color
- [x] Send svg as string
- [ ] Use firestore to makeTimestamp from updatedOn, createdOn
- [ ] Set updatedOn on server
- [ ] Create new product then navigate to product page


