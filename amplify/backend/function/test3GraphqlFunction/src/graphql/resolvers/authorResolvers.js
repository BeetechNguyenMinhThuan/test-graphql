import {mongoDataMethods} from '../../data/api.js'
export const authorResolvers = {
    // QUERY DATA
    Query: {
        authors: async (parent, args, context) => await mongoDataMethods.getAllAuthors(),
        author: async (parent, args, context) => await mongoDataMethods.getAuthorByID(args.id),  // Lay tu db
        hello:()=>"Hiiiii"
    },
    // tim den type la Author thi se di vao day
    Author: {
        books: async (parent, args, context) => await mongoDataMethods.getAllBooks({authorId: parent.id}),
    },

    // MUTATION
    Mutation: {
        createAuthor: async (parent, args, context) => await mongoDataMethods.createAuthor((args)),
    }
}
