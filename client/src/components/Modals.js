import { Modal, Button, Col, Row, Alert, Form } from 'react-bootstrap';
import MemeWrapper from './Memes';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const ModalHome = (props) => {
    const { show, selectedMeme, closeModal, user } = props;

    return (
        <Modal show={show} onHide={closeModal}>
            < Modal.Header closeButton >
                <Modal.Title>{selectedMeme.title}</Modal.Title>
            </Modal.Header >
            <Modal.Body><MemeWrapper meme={selectedMeme} style={{ height: '100%', width: '100%' }} /></Modal.Body>
            <Modal.Footer>
                {user ? <Button variant="secondary" onClick={closeModal}>Copy</Button> : <></>}
                {user === selectedMeme.creator ? <Button variant="secondary" onClick={closeModal}>Delete</Button> : <></>}
                <Button variant="secondary" onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

const handleSubmit = (event) => { }

const ModalCreate = (props) => {
    const { show, selectedTemplate, closeModal, user } = props;
    const selectedMeme = { title: "", image: selectedTemplate, sentence1: "", sentence2: "", sentence3: "", creator: user };

    return (
        <Modal show={show} onHide={closeModal} size="xl">
            < Modal.Header closeButton >
                <Modal.Title>Create your meme</Modal.Title>
            </Modal.Header >
            <Modal.Body style={{ height: '80vh'}}>
                <Row>
                    <Col><MemeWrapper meme={selectedMeme} style={{ height: '100%', width: '100%' }} /></Col>
                    <Col>
                        <Form onSubmit={handleSubmit} >
                            <Modal.Header>
                                <Modal.Title>Login</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Alert
                                    dismissible
                                    show={show}
                                    /*                             onClose={() => setShow(false)} */
                                    variant="danger">
                                    {/*                             {errorMessage} */}
                                </Alert>
                                <Form.Group controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="username"
                                    /*                                 value={username}
                                                                    onChange={(ev) => setUsername(ev.target.value)} */
                                    />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                    /*                                 value={password}
                                                                    onChange={(ev) => setPassword(ev.target.value)} */
                                    />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" type="submit">Login</Button>
                            </Modal.Footer>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
}

const Modals = { ModalHome, ModalCreate };
export default Modals;