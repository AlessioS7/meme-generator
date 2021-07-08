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
            }}>{props.meme.sentence1}</p>
            <p className="center" style={{
                top: '51%',
            }}>{props.meme.sentence2}</p>
        </>
    );
}

export default MemeWrapper;