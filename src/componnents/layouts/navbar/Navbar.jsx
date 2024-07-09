import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navigation() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="about">About</Nav.Link>
            <Nav.Link href="contacts">Contacts</Nav.Link>
            <Nav.Link href="register">Register</Nav.Link>
            <Nav.Link href="login">Login</Nav.Link>
            <Nav.Link href="logout">Logout</Nav.Link>
            <Nav.Link href="profile">Profile</Nav.Link>
            <NavDropdown title="Junkyard" id="basic-nav-dropdown">
              <NavDropdown.Item href="junk-collection">Junk Collection</NavDropdown.Item>
              <NavDropdown.Item href="sell">
                Sell offers
              </NavDropdown.Item>
              <NavDropdown.Item href="buy">Buy Offers</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
