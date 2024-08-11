import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Form from "react-bootstrap/Form";
import styles from './Authentication.module.css';
import Submit from "../../componnents/UI/buttons/submit/Submit";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== rePassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created:", userCredential.user);
      // You can now use the username and attach it to the user in your database if needed
    } catch (error) {
      setError(error.message);
      handleFirebaseError(error.code);
    }
  };

  const handleFirebaseError = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        setError("This email address is already in use.");
        break;
      case "auth/invalid-email":
        setError("The email address is not valid.");
        break;
      case "auth/operation-not-allowed":
        setError("Email/password accounts are not enabled.");
        break;
      case "auth/weak-password":
        setError("The password is too weak.");
        break;
      default:
        setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.container}>
      <Form className={styles.formContainer} onSubmit={handleSignUp}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicRePassword">
          <Form.Label>Repeat Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Repeat Password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
        </Form.Group>
        {error && <p className="text-danger">{error}</p>}
        <Submit />
      </Form>
    </div>
  );
};

export default Register;
