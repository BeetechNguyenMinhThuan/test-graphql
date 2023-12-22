import React, {useState} from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import BookDetails from './BookDetail'
import {CardBody, CloseButton, Modal} from "react-bootstrap";
import {useMutation, useQuery} from "@apollo/client";
import {getAuthors, getBooks} from "../graphql-client/queries";
import Button from "react-bootstrap/Button";
import {deleteSingleBook, editSingleBook} from "../graphql-client/mutations";
import BookForm from "./BookForm";
import BookFormEdit from "./BookFormEdit";

const BookList = () => {
    const {loading, error, data} = useQuery(getBooks)
    const [bookSelected, setBookSelected] = useState(null)
    const [bookSelectedEdit, setBookSelectedEdit] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [deleteBook, dataMutation] = useMutation(deleteSingleBook)
    const [editBook, dataMutationEditBook] = useMutation(editSingleBook)
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
        setIsEdit(false)
    };
    const handleShow = (book) => {
        setShow(true);
        setIsEdit(true)
        setBookSelectedEdit(book)
    }
    if (loading) {
        return <p>Loading books...</p>
    }
    if (error) {
        return <p>Error loading books!</p>
    }

    const handleDeleteBook = async (id) => {
        let data = await deleteBook({
            variables: {
                id,
            },
            refetchQueries: [{query: getBooks}] // tu dong goi them query nay khi  add author
        })
    }

    const handleEditBook = async (book) => {
        setShow(false);
        let data = await editBook({
            variables: {
                id: book.id,
                name: book.name,
                genre: book.genre,
                authorId: book.authorId,
            },
            refetchQueries: [{query: getBooks}] // tu dong goi them query nay khi edit author
        })
    }

    return (
        <Row>
            <Col md={6}>
                <Row>
                    {!loading && data.books.length > 0 && data.books.map(book => (
                        <Col className='g-3' md={4} key={book.id}>
                            <Card text='info' border='info' className='text-center shadow position-relative'
                                  style={{cursor: 'pointer'}}
                                  onClick={() => setBookSelected(book)}>
                                <CloseButton onClick={() => handleDeleteBook(book.id)} className='position-absolute'
                                             style={{right: '0'}}/>
                                <Button onClick={()=>handleShow(book)} className='position-absolute'
                                        style={{left: '0'}}>Edit</Button>
                                <CardBody>{book.name}</CardBody>
                            </Card>
                        </Col>
                    ))}
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <BookFormEdit handleEditBook={handleEditBook} bookEdit={bookSelectedEdit}/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Row>
            </Col>

            <Col>
                <BookDetails bookId={bookSelected ? bookSelected.id : null}/>
            </Col>
        </Row>
    )
}

export default BookList
