import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from './Authentication.module.css'
import Submit from "../../componnents/UI/buttons/submit/Submit";

function Register() {
  return (
    <div className={styles.container}>
        <Form className={styles.formContainer}>
        <Form.Group className = 'mb-3' controlId="formBasicUsername">
            <Form.Label>Username: </Form.Label>
            <Form.Control type='username' placeholder='Enter Username'></Form.Control>
        </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address: </Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicRePassword">
        <Form.Label>Repeat Password: </Form.Label>
        <Form.Control type="repassword" placeholder="Repeat Password" />
      </Form.Group>
      <Submit></Submit>
    </Form>
    </div>
    
  );
}

export default Register;
