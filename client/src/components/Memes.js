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
    return mapImagesComponents[props.meme.image](props);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Drake = (props) => {
    const { meme, style, className } = props;
    return (
        <>
            <img src={images[meme.image].default} style={style} className={className} />
            <p className="center-drake" style={{
                top: '2%',
                fontFamily: `${meme.font}`,
                color: `rgba(${meme.fontColor.r}, ${meme.fontColor.g}, ${meme.fontColor.b}, ${meme.fontColor.a})`,
            }}>{props.meme.sentence1}</p>
            <p className="center-drake" style={{
                top: '51%',
                fontFamily: `${meme.font}`,
                color: `rgba(${meme.fontColor.r}, ${meme.fontColor.g}, ${meme.fontColor.b}, ${meme.fontColor.a})`,
            }}>{props.meme.sentence2}</p>
        </>
    );
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TODO
const SpongebobRainbow = (props) => {
    const { meme, style, className } = props;

    return (
        <>
            <img src={images[meme.image].default} style={style} className={className} />
            <p className="center-sr" style={{
                top: '1%',
                fontFamily: `${meme.font}`,
                color: `rgba(${meme.fontColor.r}, ${meme.fontColor.g}, ${meme.fontColor.b}, ${meme.fontColor.a})`,
            }}>{props.meme.sentence1}</p>
            <p className="center-sr" style={{
                top: '86%',
                fontFamily: `${meme.font}`,
                color: `rgba(${meme.fontColor.r}, ${meme.fontColor.g}, ${meme.fontColor.b}, ${meme.fontColor.a})`,
            }}>{props.meme.sentence2}</p>
        </>
    );
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const IfTheyCouldRead = (props) => {
    const { meme, style, className } = props;

    return (
        <>
            <img src={images[meme.image].default} style={style} className={className} />
            <p className="center-itcr" style={{
                fontFamily: `${meme.font}`,
                color: `rgba(${meme.fontColor.r}, ${meme.fontColor.g}, ${meme.fontColor.b}, ${meme.fontColor.a})`,
            }}>{props.meme.sentence1}</p>
        </>
    );
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mapImagesComponents = {
    "drake.jpg": Drake,
    "spongebobRainbow.jpg": SpongebobRainbow,
    "ifTheyCouldRead.png": IfTheyCouldRead
};

export default MemeWrapper;