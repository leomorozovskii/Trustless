import { GraphQLClient } from 'graphql-request';

import { environment } from '@berezka-dao/core/environment';

const subgraphClient = new GraphQLClient(environment.subgraphEndpoint);

export { subgraphClient };
