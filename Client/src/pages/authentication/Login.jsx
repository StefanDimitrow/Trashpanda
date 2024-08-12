import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import Form from 'react-bootstrap/Form';
import styles from './Authentication.module.css';
import Submit from '../../componnents/UI/buttons/submit/Submit';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        navigate('/junk-collection'); // Redirect to Junk Collection if logged in
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/junk-collection'); // Redirect after successful login
    } catch (error) {
      console.error("Login Error:", error); // Log the full error object for debugging
      handleFirebaseError(error.code);
    }
  };

  const handleFirebaseError = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-credential":
        setError("The credentials provided are invalid.");
        break;
      case "auth/user-not-found":
        setError("No account found with this email.");
        break;
      case "auth/wrong-password":
        setError("Incorrect password. Please try again.");
        break;
      case "auth/invalid-email":
        setError("The email address is not valid.");
        break;
      case "auth/too-many-requests":
        setError("Too many failed login attempts. Please try again later.");
        break;
      default:
        setError("An unexpected error occurred. Please try again later.");
        break;
    }
  };

  return (
    <div className={styles.container}>
      <Form className={styles.formContainer} onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {error && <p className="text-danger">{error}</p>}
        <Submit />
      </Form>
    </div>
  );
}



