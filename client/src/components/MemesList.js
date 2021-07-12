import { Container, Row, Col } from 'react-bootstrap';
import MemeWrapper from './Memes';

const MemesList = (props) => {
    const { list, setSelectedMeme, showModal } = props;
    return (
        <Container>
            <Row xs={2} md={3}>
                {list.map(m => {
                    return (
                        <Col key={m.id} className="previewMeme clickable" onClick={() => {setSelectedMeme(m.id); showModal()}}>
                            <div className="homeTitle"><strong className="ml-1">{m.title}</strong></div>
                            <div className="position-sticky"><MemeWrapper meme={m} style={{height: '350px'}}/></div>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
}

export default MemesList;