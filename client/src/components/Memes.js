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
    return Drake(props); //map[props.meme.image].component(props);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Drake = (props) => {
    const { meme, style, className } = props;
    return (
        <>
            <img src={images[props.meme.image].default} style={style} className={className}/>
            <p className="center" style={{
                top: '2%',
            }}>HELLO From the adfaj ifaodj ai daifj kdsaljf jaskflj klajf lakjfdlka j idhfodah</p>
            <p className="center" style={{
                top: '51%',
            }}>HELLO From the other addadsad da afaj ifaodj aiah</p>
        </>
    );
}

export default MemeWrapper;