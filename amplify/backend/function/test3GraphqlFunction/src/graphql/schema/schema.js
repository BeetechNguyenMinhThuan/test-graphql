import {ApolloServer} from 'apollo-server-lambda'
import {authorTypeDefs} from "./authorSchema.js";
import {bookTypeDefs} from "./bookSchema.js";
import {authorResolvers} from "../resolvers/authorResolvers.js";
import {bookResolvers} from "../resolvers/bookResolver.js";

export const server = new ApolloServer({
    typeDefs: [authorTypeDefs, bookTypeDefs],
    resolvers: [authorResolvers, bookResolvers],
    context: ({event, context}) => ({
        headers: event.headers,
        functionName: context.functionName,
        event,
        context,
    }),
});

