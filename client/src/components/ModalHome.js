import { Modal, Button } from 'react-bootstrap';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));
console.log(images);

const ModalHome = (props) => {

    return (
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <img src={images["ifTheyCouldRead.png"].default} style={{ height: '100%', width: '100%'  }} />
                <p className="center" style={{
                    top: '2%',
                }}>HELLO From the other adfaj ifaodj ai daifj kdsaljf jaskflj klajf lakjfdlka j idhfodah</p>
                <p className="center" style={{
                    top: '51%',
                }}>HELLO From the other adfaj ifaodj aiah</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Save changes</Button>
            </Modal.Footer>
        </Modal.Dialog>
    );
}

export default ModalHome;