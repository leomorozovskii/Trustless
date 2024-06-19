## About the project

The project was created on Next.js. `yarn v1+` is used to manage dependencies.

`yarn dev` - start dev server. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result..

`yarn build` - build project for production.

`yarn start` - start production server after build.

## Environment variables

The project uses environment variables from the `.env` file. After downloading the project, you need to create a `.env` file in the project root and fill it with the appropriate variables. An example of filling can be found in the `.env.example` file. 

- `NEXT_PUBLIC_APP_NAME` - your application name.

- `NEXT_PUBLIC_PROJECT_ID` - projectId from [WalletConnect Cloud](https://cloud.walletconnect.com) for WalletConnect.

- `NEXT_PUBLIC_CONTRACT_ADDRESS` - TrustlessOTC contract address.

- `NEXT_PUBLIC_ALCHEMY_API_URL` - Alchemy API URL from [Alchemy Dashboard](https://dashboard.alchemy.com).

- `NEXT_PUBLIC_SUBGRAPH_ENDPOINT` - endpoint for queries to the subgraph.

- `NEXT_PUBLIC_NETWORK` - one of the supported networks. `mainnet`, `arbitrum` and `sepolia` are currently supported.

- `NEXT_PUBLIC_SITE_URL` - url of your site. To display links to created offers.

- `NEXT_PUBLIC_ETHERSCAN_API_URL` - etherscan API URL. For request for current eth_usd price.
