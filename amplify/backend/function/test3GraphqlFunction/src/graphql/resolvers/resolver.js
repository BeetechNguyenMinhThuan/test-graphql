import {mongoDataMethods} from '../../data/api.js'
export const resolvers = {
    // QUERY DATA
    Query: {
        books: async (parent, args, context) => await mongoDataMethods.getAllBooks(),
        book: async (parent, args, context) => await mongoDataMethods.getBookByID(args.id),
        authors: async (parent, args, context) => await mongoDataMethods.getAllAuthors(),
        // author: (parent, args) => authors.find(author => author.id.toString() === args.id) -> lay tu file static.js
        author: async (parent, args, context) => await mongoDataMethods.getAuthorByID(args.id),  // Lay tu db
        hello:()=>"Hiiiii"
    },
    Book: {
        author: async (parent, args, context) => await mongoDataMethods.getAuthorByID(parent.authorId),
    },

    // tim den type la Author thi se di vao day
    Author: {
        books: async (parent, args, context) => await mongoDataMethods.getAllBooks({authorId: parent.id}),
    },

    // MUTATION
    Mutation: {
        createAuthor: async (parent, args, context) => await mongoDataMethods.createAuthor((args)),
        createBook: async (parent, args, context) => await mongoDataMethods.createBook((args)),
        deleteBook: async (parent, args, context) => await mongoDataMethods.deleteBook((args)),
        editBook: async (parent, args, context) => await mongoDataMethods.editBook((args)),
    }
}
