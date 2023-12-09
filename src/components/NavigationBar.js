import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './NavigationBar.css';
import * as userClient from '../users/client';
import { setCurrentUser } from '../users/reducer';

function NivagationBar() {
    const { currentUser } = useSelector((state) => state.usersReducer);
    const dispatch = useDispatch();

    const signout = async () => {
        await userClient.signout();
        dispatch(setCurrentUser(null));
    };
    return (
        <div className="navbar-container bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#/TissueBoxd/home">TissueBoxd</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#/TissueBoxd/search">Search</Nav.Link>
                            {!currentUser && <Nav.Link href="#/TissueBoxd/login">Sign In</Nav.Link>}
                            {!currentUser && <Nav.Link href="#/TissueBoxd/register">Create Account</Nav.Link>}
                            {currentUser && (
                                <NavDropdown title={`Logged in as: ${currentUser.username}`} id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#/TissueBoxd/profile">Profile</NavDropdown.Item>
                                    {currentUser.role === 'ADMIN' && (
                                        <NavDropdown.Item href="#/TissueBoxd/users">Users</NavDropdown.Item>
                                    )}
                                    {currentUser && <NavDropdown.Divider />}
                                    {currentUser && (
                                        <NavDropdown.Item onClick={signout} href="#/TissueBoxd/home">
                                            Sign Out
                                        </NavDropdown.Item>
                                    )}
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}
export default NivagationBar;
