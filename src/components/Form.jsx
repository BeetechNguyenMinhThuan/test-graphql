import React, {useState} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import BookForm from "./BookForm";
import AuthorForm from "./AuthorForm";

const Forms = () => {

    return (
        <Row>
            <BookForm/>
            <AuthorForm/>
        </Row>
    )
}

export default Forms
