import React, {useState} from 'react';
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useMutation, useQuery} from "@apollo/client";
import {getAuthors} from "../graphql-client/queries";
import {addSingleAuthor} from "../graphql-client/mutations";

const AuthorForm = (props) => {
    const [newAuthor, setNewAuthor] = useState({
        name: "",
        age: "",
    })

    // GraphQL
    const [addAuthor, dataMutation] = useMutation(addSingleAuthor)
    const onInputchange = event => {
        setNewAuthor(
            {
                ...newAuthor,
                [event.target.name]: event.target.value
            })
    }

    const handleSubmitAuthorForm = async (e) => {
        e.preventDefault()
        if (!newAuthor.name || !newAuthor.age) {
            return
        }
        console.log(newAuthor)
        let data = await addAuthor({
            variables: {
                name: newAuthor.name,
                age: Number(newAuthor.age),
            },
            refetchQueries: [{query: getAuthors}] // tu dong goi them query nay khi  add author
        })
        setNewAuthor({
            name: "",
            age: "",
        })
    }
    return (
        <Col>
            <Form onSubmit={handleSubmitAuthorForm}>
                <Form.Group className='invisible mb-3'>
                    <Form.Control/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type='text' placeholder='Author name' name='name' onChange={onInputchange} value={newAuthor.name}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type='number' placeholder='Author age' name='age' onChange={onInputchange} value={newAuthor.age}/>
                </Form.Group>
                <Button className='float-right' variant='info' type='submit'>
                    Add Author
                </Button>
            </Form>
        </Col>
    );
}
export default AuthorForm;