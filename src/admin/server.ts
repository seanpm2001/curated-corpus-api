import { ApolloServer } from 'apollo-server-express';
import { buildFederatedSchema } from '@apollo/federation';
import { typeDefsAdmin } from '../typeDefs';
import { resolvers as resolversAdmin } from './resolvers';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import { GraphQLRequestContext } from 'apollo-server-types';
import { sentryPlugin } from '@pocket-tools/apollo-utils';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

export const server = new ApolloServer({
  schema: buildFederatedSchema([
    { typeDefs: typeDefsAdmin, resolvers: resolversAdmin },
  ]),
  plugins: [
    //Copied from Apollo docs, the sessionID signifies if we should seperate out caches by user.
    responseCachePlugin({
      //https://www.apollographql.com/docs/apollo-server/performance/caching/#saving-full-responses-to-a-cache
      //The user id is added to the request header by the apollo gateway (client api)
      sessionId: (requestContext: GraphQLRequestContext) =>
        requestContext?.request?.http?.headers?.has('userId')
          ? requestContext?.request?.http?.headers?.get('userId')
          : null,
    }),
    sentryPlugin,
    ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
  context: {
    // TODO: add DB client
  },
});