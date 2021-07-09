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
    return Drake(props); //map[props.meme.image].component(props);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Drake = (props) => {
    const { meme, style, className } = props;
    return (
        <>
            <img src={images[meme.image].default} style={style} className={className}/>
            <p className="center" style={{
                top: '2%',
                fontFamily: `${meme.font}`,
                color: `rgba(${meme.fontColor.r}, ${meme.fontColor.g}, ${meme.fontColor.b}, ${meme.fontColor.a})`,
            }}>{props.meme.sentence1}</p>
            <p className="center" style={{
                top: '51%',
                fontFamily: `${meme.font}`,
                color: `rgba(${meme.fontColor.r}, ${meme.fontColor.g}, ${meme.fontColor.b}, ${meme.fontColor.a})`,
            }}>{props.meme.sentence2}</p>
        </>
    );
}

export default MemeWrapper;