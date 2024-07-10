import React from 'react';
import Form from 'react-bootstrap/Form';
import styles from './Authentication.module.css';
import Submit from '../../componnents/UI/buttons/submit/Submit';


export default function Login() {
  return (
    <div className={styles.container}>
      <Form className={styles.formContainer}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
          />
        </Form.Group>
        <Submit />
      </Form>
    </div>
  );
}


