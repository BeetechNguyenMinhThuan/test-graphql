import React, {useState} from 'react';
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useMutation, useQuery} from "@apollo/client";
import {getAuthors} from "../graphql-client/queries";

const BookForm = ({bookEdit, handleEditBook}) => {
    const [newBook, setNewBook] = useState({
        id: bookEdit.id,
        name: bookEdit.name,
        genre: bookEdit.genre,
        authorId: bookEdit.author.id
    })
    // GraphQL
    const {loading, error, data} = useQuery(getAuthors)
    const onInputchange = event => {
        setNewBook(
            {
                ...newBook,
                [event.target.name]: event.target.value
            })
    }

    const handleSubmitBookForm = async (e) => {
        e.preventDefault()
        if (!newBook.name || !newBook.genre || !newBook.authorId) {
            return
        }
        handleEditBook(newBook)
    }
    return (
        <Col>
            <Form onSubmit={handleSubmitBookForm}>
                <Form.Group className="mb-3">
                    <Form.Control type='text' placeholder='Book name' name='name' onChange={onInputchange}
                                  value={newBook.name}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type='text' placeholder='Book genre' name='genre' onChange={onInputchange}
                                  value={newBook.genre}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control as='select' name='authorId' onChange={onInputchange} value={newBook.authorId}>
                        <option value={''} disabled>Select author</option>
                        {!loading && data.authors.length > 0 && data.authors.map(author => (
                            <option value={author.id}
                                    key={author.id}>{author.name}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button className='float-right' variant='info' type='submit'>
                    Update Book
                </Button>
            </Form>
        </Col>
    );
}
export default BookForm;