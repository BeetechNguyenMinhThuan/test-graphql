export const authorTypeDefs = `#graphql
type Author {
    id: ID!, # ! ý nghĩa là ID phải bắt buộc là string hoặc number, không đc null ( hieu la required)
    name: String,
    age: Int,
    books: [Book]
}

# ROOT TYPE
type Query {
    authors: [Author]
    author (id: ID!): Author
    hello: String
}

type Mutation {
    createAuthor(name:String, age: Int): Author
}
`

