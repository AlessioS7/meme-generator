import { Container, Row, Col } from 'react-bootstrap';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const TemplatesList = (props) => {
    const {setSelectedTemplate, showModal} = props;

    return (
        <Container>
            <h2 className="mb-4">Select a template image:</h2>
            <Row xs={3} md={4}>
                {Object.entries(images).map(elem => {
                    return (
                        <Col className="previewMeme clickable" onClick={() => {setSelectedTemplate(elem[0]); showModal()}}>
                            <img src={elem[1].default} style={{height: '255px', borderRadius: '3%'}} alt="selected template"/>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
}

export default TemplatesList;