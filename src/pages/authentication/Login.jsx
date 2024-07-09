import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import styles from "./Authentication.module.css";

export default function Login() {
  return (
    <div className={styles.container}>
      <Form className={styles.formContainer}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username: </Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter Username"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
      </Form>
    </div>
  );
}
