import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { useSelector } from 'react-redux';

function PrivateRoute(props) {

    // const { user } = useContext(UserContext);
    const isAuth = useSelector((state) => state.auth.isAuthenticated);

    if(!isAuth) {
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