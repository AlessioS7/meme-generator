import { Image } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const TemplatesList = (props) => {
    const list = Object.entries(images).map(elem => elem[1].default);
    console.log(list);

    return (
        <Container>
            <h2>Select a template image:</h2>
            <Row xs={3} md={4}>
                {list.map(template => {
                    return (
                        <Col className="previewMeme clickable">
                            <img src={template} />
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
}

export default TemplatesList;