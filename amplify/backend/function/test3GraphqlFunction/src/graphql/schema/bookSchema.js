export const bookTypeDefs = `#graphql
type Book {
    id: ID,
    name: String,
    genre: String,
    author: Author,
    image: String
}
# ROOT TYPE
type Query {
    books: [Book]
    book (id: ID!): Book
    hello: String
}

type Mutation {
    createBook(name:String, genre:String, authorId: ID!, image: String): Book
    deleteBook(id:ID!): Book
    editBook(id:ID!,name:String, genre:String, authorId: ID!, image: String): Book
}
`

