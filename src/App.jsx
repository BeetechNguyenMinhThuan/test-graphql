import {withAuthenticator} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Forms from "./components/Form.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import BookList from "./components/BookList.jsx";
import {Container} from "react-bootstrap";


function App({signOut, user}) {
    return (
        <>
            <Container className='py-3 mt-3' style={{backgroundColor: 'lightcyan'}}>
                <h1 className='text-center text-info mb-3'>My Books</h1>
                <hr/>
                <Forms/>
                <hr/>
                <BookList/>
                <button onClick={signOut}>Sign out</button>
            </Container>
        </>
    );
}

export default withAuthenticator(App);
