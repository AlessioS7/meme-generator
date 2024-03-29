import { Form, Button, Alert, Modal } from 'react-bootstrap';
import { useState } from 'react';

// LoginForm component
function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage('');
        const credentials = { username, password };

        // form validation
        let valid = true;
        if (username === '' || password === '' || password.length < 6) {
            valid = false;
            setErrorMessage('Username cannot be empty and password must be at least six characters long.');
            setShow(true);
        }

        if (valid) {
            props.login(credentials)
                .catch((err) => { setErrorMessage(String(err)); setShow(true); })
        }
    };

    // JSX
    return (
        <Form onSubmit={handleSubmit} className="authForm">
            <Modal.Header>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert
                    dismissible
                    show={show}
                    onClose={() => setShow(false)}
                    variant="danger">
                    {errorMessage}
                </Alert>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="username"
                        value={username}
                        onChange={(ev) => setUsername(ev.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(ev) => setPassword(ev.target.value)}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" type="submit">Login</Button>
            </Modal.Footer>
        </Form>
    );
}

// LogoutButton component
function LogoutButton(props) {
    // JSX
    return (
        <Button variant="secondary" onClick={props.logout}>Logout</Button>
    )
}

export { LoginForm, LogoutButton };