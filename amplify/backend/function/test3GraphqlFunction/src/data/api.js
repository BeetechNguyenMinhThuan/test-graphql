import {Book} from "../models/Book.js";
import {Author} from "../models/Author.js";

export const mongoDataMethods = {
    getAllBooks: async (condition = null) => condition === null ? await Book.find() : await Book.find(condition),
    createBook: async (args) => {
        const newBook = new Book(args)
        return await newBook.save()
    },
    getBookByID: async (id) => {
        return Book.findById(id);
    },
    editBook: async ({id, name, genre, authorId}) => {
        return await Book.findOneAndUpdate({
            _id: id,
        }, {name: name, genre: genre, authorId: authorId}, {new: true})
    },
    deleteBook: async ({id}) => {
        return Book.findByIdAndDelete({_id: id})
    },

    // Author
    getAllAuthors: async () => await Author.find(),
    createAuthor: async (args) => {
        const newAuthor = new Author(args)
        return await newAuthor.save()
    },
    getAuthorByID: async (id) => {
        return await Author.findById(id)
    },
}

