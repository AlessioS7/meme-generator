import { Modal, Button } from 'react-bootstrap';
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

const ModalCreate = (props) => {

}

const Modals = { ModalHome, ModalCreate };
export default Modals;