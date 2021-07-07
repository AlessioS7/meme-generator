import { Image } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));
console.log(images);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const MemeWrapper = (props) => {
    return Drake(props);
}

const Drake = (props) => {
    return (
        <Col className="previewMeme clickable" >
            <img src={images[props.meme.image].default} />
            <p style={{
                position: 'absolute',
                top: '17%',
                left: '53%',
                marginRight: '20px'
            }}>HELLO From the other side of the road</p>
        </Col>
    );
}

export default MemeWrapper;