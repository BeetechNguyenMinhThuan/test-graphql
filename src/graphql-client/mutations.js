import {gql} from "@apollo/client";

const addSingleBook = gql`
    mutation addSingleBookMutation($name: String, $genre:String, $authorId: ID!, $image: String){
        createBook(name:$name, genre:$genre, authorId: $authorId, image:$image){
            id
            name
        }
    }
`

const addSingleAuthor = gql`
    mutation addSingleAuthorMutation($name: String, $age:Int){
        createAuthor(name:$name, age:$age){
            id
            name
            age
        }
    }
`
const deleteSingleBook = gql`
    mutation deleteBook($id: ID!){
        deleteBook(id:$id){
            id
            name
            genre
        }
    }
`

const editSingleBook = gql`
    mutation editBook($id: ID!,$name: String, $genre:String, $authorId: ID!){
        editBook(id:$id,name:$name, genre:$genre, authorId: $authorId){
            id
            name
            genre
        }
    }
`

export {addSingleBook, addSingleAuthor, deleteSingleBook, editSingleBook}