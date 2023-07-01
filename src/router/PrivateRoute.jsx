import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import Alert from 'react-bootstrap/Alert';

function PrivateRoute(props) {

    const { user } = useContext(UserContext);

    if(user && !user.auth) {
        return (
            <Alert variant="danger" className='my-3'>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                You need to login 
                </p>
            </Alert>
        )
    }
    return (
        props.children
    );
}

export default PrivateRoute;