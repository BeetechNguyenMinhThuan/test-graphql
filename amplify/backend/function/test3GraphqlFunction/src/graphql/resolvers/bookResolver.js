import {mongoDataMethods} from '../../data/api.js'
export const bookResolvers = {
    // QUERY DATA
    Query: {
        books: async (parent, args, context) => await mongoDataMethods.getAllBooks(),
        book: async (parent, args, context) => await mongoDataMethods.getBookByID(args.id),
        hello:()=>"Hiiiii"
    },
    Book: {
        author: async (parent, args, context) => await mongoDataMethods.getAuthorByID(parent.authorId),
    },


    // MUTATION
    Mutation: {
        createBook: async (parent, args, context) => await mongoDataMethods.createBook((args)),
        deleteBook: async (parent, args, context) => await mongoDataMethods.deleteBook((args)),
        editBook: async (parent, args, context) => await mongoDataMethods.editBook((args)),
    }
}
