import React, {Fragment, useState} from 'react'
import Card from 'react-bootstrap/Card'
import {useQuery} from "@apollo/client";
import {getSingleBook} from "../graphql-client/queries";
import {CardText} from "react-bootstrap";

const BookDetails = ({bookId}) => {
    const {loading, error, data} = useQuery(getSingleBook, {variables: {id: bookId}, skip: bookId === null})
    if (loading) {
        return <p>Loading book detail...</p>
    }
    if (error) {
        console.log(error.message)
        return <p>Error loading book detail!</p>
    }
    const book = bookId !== null ? data.book : null
    return (
        <Card bg='info' text='white' className='shadow'>
            <Card.Body>
                {book === null ? <CardText>Please select a book</CardText> :
                    <Fragment>
                        <Card.Title>{book.name}</Card.Title>
                        <Card.Subtitle>Thể loại: {book.genre}</Card.Subtitle>
                        <p>Tác giả: {book.author.name}</p>
                        <p>Tuổi: {book.author.age}</p>
                        <p>Sách cùng tác giả</p>
                        <ul>
                            {book.author.books.map((book) => (
                                <li key={book.id}>{book.name}</li>
                            ))}
                        </ul>
                    </Fragment>
                }
            </Card.Body>
        </Card>
    )
}

export default BookDetails
