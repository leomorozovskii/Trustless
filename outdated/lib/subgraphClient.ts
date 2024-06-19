import { GraphQLClient } from 'graphql-request';
import { environment } from './environment';

const subgraphClient = new GraphQLClient(environment.subgraphEndpoint);

export { subgraphClient };
