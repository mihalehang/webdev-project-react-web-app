import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './NavigationBar.css';

function NivagationBar() {
    const { currentUser } = useSelector((state) => state.usersReducer);
    return (
        <div  className ='navbar-container bg-body-tertiary' bg="dark" data-bs-theme="dark">
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
