import { Image } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const MemeWrapper = (props) => {
    return Drake(props);
}

const Drake = (props) => {
    return (
        <Col className="previewMeme">  
            <img src={images[props.meme.image].default}/>
        </Col>
    );
}

export default MemeWrapper;