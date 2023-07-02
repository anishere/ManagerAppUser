import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './header.scss';
import logoHeader from '../assets/img/React-icon.svg.png'
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

function Header(props) {

    const { user, logout } = useContext(UserContext);

    const handleLogout = () => {
        logout()
        toast.success('You have logged out')
    }

    return (
        <>
        <Navbar expand="lg" className="bg-body-tertiary navbar">
        <Container>
            <Link to='/' className='navbar-brand' >
                <img src={logoHeader} alt="Logo" width="30" height="24" className="d-inline-block align-text-top mx-1"/>
                <span>A's App</span>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                {((user && user.auth) || window.location.pathname === '/') &&     
                <>
                    <Link to='/' className='nav-link' >Home</Link>               
                    <Link to='/users' className='nav-link' >Users</Link>
                </>
                }    
            </Nav>
            <Nav>
                {user && user.auth
                    && <span className='nav-link'>Welcome {user.email}</span>
                }
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                    {user && user.auth === true
                        ? <Link to='/'
                            className='dropdown-item' 
                            onClick={() => handleLogout()}
                            >Log out</Link>
                        : <Link to='/login' className='dropdown-item' >Log in</Link>
                    }     
                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        </>
    );
}

export default Header;