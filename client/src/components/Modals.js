import { Modal, Button, Col, Row, Alert, Form } from 'react-bootstrap';
import MemeWrapper from './Memes';
import { useState } from 'react';
import ColorPicker from './ColorPicker';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

const squaredImages = ["spongebobRainbow.jpg", "dad.jpg"];
const modalSize = (image) => squaredImages.includes(image);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Public = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-eye-fill text-success" viewBox="0 0 16 16">
            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
        </svg>
    );
}

const Protected = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-eye-slash-fill text-danger" viewBox="0 0 16 16">
            <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
        </svg>
    );
}

const ModalHome = (props) => {
    const { show, selectedMeme, closeModal, user } = props;

    return (
        <Modal show={show} onHide={closeModal} centered size={modalSize(selectedMeme.image) ? "lg" : "md"} >
            < Modal.Header closeButton >
                <Modal.Title>{selectedMeme.title}</Modal.Title>
            </Modal.Header >
            <Modal.Body><MemeWrapper meme={selectedMeme} style={{ height: '100%', width: '100%' }} /></Modal.Body>
            <Modal.Footer>
                <span className="rel-left">Author: {selectedMeme.creator} <span class="tab-space">&nbsp;</span>
                    {selectedMeme.public ? <Public /> : <Protected />}
                </span>
                {user ? <Button variant="secondary" onClick={closeModal}>Copy</Button> : <></>}
                {user === selectedMeme.creator ? <Button variant="secondary" onClick={closeModal}>Delete</Button> : <></>}
                <Button variant="secondary" onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const handleSubmit = (event) => { }

// Modal create component
const ModalCreate = (props) => {
    const { show, selectedTemplate, closeModal, user } = props;
    const [textColor, setTextColor] = useState({ displayColorPicker: false, color: { r: '0', g: '0', b: '0', a: '1' } });

    const selectedMeme = { title: "", image: selectedTemplate, sentence1: "", sentence2: "", sentence3: "", creator: user };

    return (
        <Modal show={show} onHide={closeModal} size="xl" centered>
            < Modal.Header closeButton >
                <Modal.Title>Create your meme</Modal.Title>
            </Modal.Header >
            <Modal.Body style={{ height: '80vh' }}>
                <Row className="h-100">
                    <Col className="templateCreate"><MemeWrapper meme={selectedMeme} style={{ height: '100%', width: '100%' }} /></Col>
                    <Col className="border-left border-secondary">
                        <Form onSubmit={handleSubmit} >
                            <Modal.Body>
                                <Form.Control type="text" placeholder="Title" />
                                <br />
                                <Row >
                                    <Col sm="1" className="d-flex align-items-center">
                                        Font:
                                    </Col>
                                    <Col sm="7">
                                        <Form.Control as="select">
                                            <option>Arial</option>
                                            <option>Calibri</option>
                                            <option>Roboto</option>
                                        </Form.Control>
                                    </Col>
                                    <Col sm="1" className="d-flex align-items-center offset-2">
                                        <ColorPicker textColor={textColor} setTextColor={setTextColor}/>
                                    </Col>
                                </Row>
                                <br />
                                <Form.Group controlId="sentence1">
                                    <Form.Control as="textarea" placeholder="Sentence 1" rows={3} className="resize-none" />
                                </Form.Group>
                                <Form.Group controlId="sentence2">
                                    <Form.Control as="textarea" placeholder="Sentence 2" rows={3} className="resize-none" readOnly={false} />
                                </Form.Group>
                                <Form.Group controlId="sentence3">
                                    <Form.Control as="textarea" placeholder="Sentence 3" rows={3} className="resize-none" readOnly={false} />
                                </Form.Group>
                                <br />
                                <Form.Group controlId="checkbox">
                                    <Form.Check type="checkbox" label="Public" />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" type="submit">Post</Button>
                            </Modal.Footer>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal >
    );
}

const Modals = { ModalHome, ModalCreate };
export default Modals;