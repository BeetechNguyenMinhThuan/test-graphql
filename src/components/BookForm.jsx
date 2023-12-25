import React, {useState} from 'react';
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useMutation, useQuery} from "@apollo/client";
import {getAuthors, getBooks} from "../graphql-client/queries";
import {addSingleBook} from "../graphql-client/mutations";
import {uploadData} from 'aws-amplify/storage';
import ImageBook from "./Image.jsx";

const BookForm = () => {
    const [newBook, setNewBook] = useState({
        name: "",
        genre: "",
        authorId: "",
        image: ""
    })
    // GraphQL
    const {loading, error, data} = useQuery(getAuthors)
    const [addBook, dataMutation] = useMutation(addSingleBook)
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
        await addBook({
            variables: {
                name: newBook.name,
                genre: newBook.genre,
                authorId: newBook.authorId,
                image: newBook.image,

            },
            refetchQueries: [{query: getBooks}] // tu dong goi them query nay khi  add book
        })
        setNewBook({
            name: "",
            genre: "",
            authorId: "",
            image: ""
        })
    }

    const handleUploadFile = async (e) => {
        const file = e.target.files[0];
        try {
            const result = await uploadData({
                key: `authors/${file.name}`,
                data: file,
                options: {
                    onProgress: ({transferredBytes, totalBytes}) => {
                        if (totalBytes) {
                            console.log(
                                `Upload progress ${
                                    Math.round(transferredBytes / totalBytes) * 100
                                } %`
                            );
                        }
                    }
                }
            }).result;
            setNewBook(prevState => ({
                ...prevState,
                image: result.key
            }));
            console.log('Succeeded: ', result);
        } catch (error) {
            console.log('Error : ', error);
        }
    };


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
                        {!loading && data?.authors?.length > 0 && data?.authors?.map(author => (
                            <option value={author.id}
                                    key={author.id}>{author.name}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type='file' placeholder='Book name' name='image' onChange={handleUploadFile}
                    />
                </Form.Group>
                <Button className='float-right' variant='info' type='submit'>
                    Add Book
                </Button>

            </Form>
        </Col>
    );
}
export default BookForm;