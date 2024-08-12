import React, { useState, useEffect, useCallback } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { auth } from '../../../firebase';  // Adjust the import path as needed
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

// Component to handle auth state changes and navigation
const Navigation = React.memo(() => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Use useCallback to memoize the authentication check
  const checkAuthState = useCallback(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    checkAuthState();
  }, [checkAuthState]);

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');  // Redirect to the login page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contacts">Contacts</Nav.Link>

            {/* Links available to all users */}
            <Nav.Link href="/junk-collection">Junk Collection</Nav.Link>
            <NavDropdown title="Offers" id="basic-nav-dropdown">
              <NavDropdown.Item href="/buy">Buy Offers</NavDropdown.Item>
              <NavDropdown.Item href="/sell">Sell Offers</NavDropdown.Item>
            </NavDropdown>

            {/* Links only for authenticated users */}
            {user ? (
              <>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default Navigation;


