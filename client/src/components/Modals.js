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
    const { show, selectedMeme, closeModal, user, changeRoute, deleteMeme } = props;

    return (
        <Modal show={show} onHide={closeModal} centered size={selectedMeme && modalSize(selectedMeme.image) ? "lg" : "md"} >
            < Modal.Header closeButton >
                <Modal.Title>{selectedMeme ? selectedMeme.title : ""}</Modal.Title>
            </Modal.Header >
            <Modal.Body><MemeWrapper meme={selectedMeme} style={{ height: '100%', width: '100%' }} /></Modal.Body>
            <Modal.Footer>
                <span className="rel-left">Author: {selectedMeme ? selectedMeme.creator : ""} <span class="tab-space">&nbsp;</span>
                    {selectedMeme && selectedMeme.public ? <Public /> : <Protected />}
                </span>
                {user ? <Button variant="secondary" onClick={() => changeRoute("createMeme")}>Copy</Button> : <></>}
                {selectedMeme && user === selectedMeme.creator ? <Button variant="secondary" onClick={() => deleteMeme(selectedMeme.id)}>Delete</Button> : <></>}
                <Button variant="secondary" onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Modal create component
const ModalCreate = (props) => {
    const { show, selectedTemplate, cm, user, addMeme, selectedMeme } = props;
    const [title, setTitle] = useState(selectedMeme ? selectedMeme.title : "");
    const [font, setFont] = useState(selectedMeme ? selectedMeme.font : "Arial");
    const color = selectedMeme ? selectedMeme.fontColor : { r: '0', g: '0', b: '0', a: '1' };
    const [textColor, setTextColor] = useState({ displayColorPicker: false, color: color });
    const [sentence1, setSentence1] = useState(selectedMeme ? selectedMeme.sentence1 : "");
    const [sentence2, setSentence2] = useState(selectedMeme ? selectedMeme.sentence2 : "");
    const [sentence3, setSentence3] = useState(selectedMeme ? selectedMeme.sentence3 : "");
    const [publ, setPubl] = useState(selectedMeme ? selectedMeme.public : false);

    const template = selectedMeme ? selectedMeme.image : selectedTemplate;
    const meme = {
        title: title, image: template, font: font, fontColor: textColor.color,
        sentence1: sentence1, sentence2: sentence2, sentence3: sentence3, public: publ, creator: user
    };

    const handleSubmit = (event) => {
        // stop event default and propagation
        event.preventDefault();
        event.stopPropagation();
        console.log(meme);
        addMeme(meme);
    }

    const closeModal = () => {
        setTitle("");
        setFont("Arial")
        setTextColor({ displayColorPicker: false, color: { r: '0', g: '0', b: '0', a: '1' } });
        setSentence1("");
        setSentence2("");
        setSentence3("");
        setPubl(false);

        cm();
    } 

    const mapImagesNumSentences = {
        "drake.jpg": { "sentence2": false, "sentence3": true, "ml": 150 },
        "spongebobRainbow.jpg": { "sentence2": false, "sentence3": true, "ml": 22 },
        "ifTheyCouldRead.png": { "sentence2": true, "sentence3": true, "ml": 60 },
        "spidermen.jpg": { "sentence2": false, "sentence3": true, "ml": 25 }
    };

    return (
        <Modal show={show} onHide={closeModal} size="xl" centered>
            < Modal.Header closeButton >
                <Modal.Title>Create your meme</Modal.Title>
            </Modal.Header >
            <Modal.Body style={{ height: '82vh' }}>
                <Row className="h-100">
                    <Col className="templateCreate"><MemeWrapper meme={meme} style={{ height: '99%', width: '99%' }} /></Col>
                    <Col className="border-left border-secondary">
                        <Form onSubmit={handleSubmit} >
                            <Modal.Body>
                                <Form.Control type="text" placeholder="Title" value={title}
                                    onChange={(ev) => setTitle(ev.target.value)} required autoFocus />
                                <br />
                                <Row >
                                    <Col sm="1" className="d-flex align-items-center">
                                        Font:
                                    </Col>
                                    <Col sm="7">
                                        <Form.Control as="select" value={font} onChange={(ev) => setFont(ev.target.value)}>
                                            <option>Arial</option>
                                            <option>Calibri</option>
                                            <option>Roboto</option>
                                        </Form.Control>
                                    </Col>
                                    <Col sm="1" className="d-flex align-items-center offset-2">
                                        <ColorPicker textColor={textColor} setTextColor={setTextColor} />
                                    </Col>
                                </Row>
                                <br />
                                <Form.Group controlId="sentence1" >
                                    <Form.Control as="textarea" placeholder="Sentence 1" rows={3} className="resize-none"
                                        value={sentence1} onChange={(ev) => setSentence1(ev.target.value)} required autoFocus
                                        maxLength={mapImagesNumSentences[meme.image] && mapImagesNumSentences[meme.image].ml} />
                                </Form.Group>
                                <Form.Group controlId="sentence2" >
                                    <Form.Control as="textarea" placeholder="Sentence 2" rows={3} className="resize-none"
                                        value={sentence2} onChange={(ev) => setSentence2(ev.target.value)}
                                        disabled={mapImagesNumSentences[meme.image] && mapImagesNumSentences[meme.image].sentence2}
                                        maxLength={mapImagesNumSentences[meme.image] && mapImagesNumSentences[meme.image].ml} />
                                </Form.Group>
                                <Form.Group controlId="sentence3" >
                                    <Form.Control as="textarea" placeholder="Sentence 3" rows={3} className="resize-none"
                                        value={sentence3} onChange={(ev) => setSentence3(ev.target.value)}
                                        disabled={mapImagesNumSentences[meme.image] && mapImagesNumSentences[meme.image].sentence3}
                                        maxLength={mapImagesNumSentences[meme.image] && mapImagesNumSentences[meme.image].ml} />
                                    <Form.Text muted className="text-center text-md-right">
                                        Max number of characters per sentence: {mapImagesNumSentences[meme.image] && mapImagesNumSentences[meme.image].ml}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="checkbox" >
                                    <Form.Check className="d-flex align-items-center" type="checkbox" label="Public"
                                        checked={publ} onChange={(ev) => setPubl(ev.target.checked)}
                                        disabled={selectedMeme && selectedMeme.public !== 1 && selectedMeme.creator !== user} />
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