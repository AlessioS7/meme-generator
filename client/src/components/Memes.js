
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
            <img src={images[meme.image].default} style={style} className={className} alt="drake"/>
            <p className="sentence pos-sentence-drake" style={{
                top: '2%',
                fontFamily: `${meme.font}`,
                color: `rgba(${meme.fontColor.r}, ${meme.fontColor.g}, ${meme.fontColor.b}, ${meme.fontColor.a})`,
            }}>{props.meme.sentence1}</p>
            <p className="sentence pos-sentence-drake" style={{
                top: '51%',
                fontFamily: `${meme.font}`,
                color: `rgba(${meme.fontColor.r}, ${meme.fontColor.g}, ${meme.fontColor.b}, ${meme.fontColor.a})`,
            }}>{props.meme.sentence2}</p>
        </>
    );
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const SpongebobRainbow = (props) => {
    const { meme, style, className } = props;

    return (
        <>
            <img src={images[meme.image].default} style={style} className={className} alt="spongebob rainbow"/>
            <p className="sentence pos-sentence-sr" style={{
                top: '4%',
                fontFamily: `${meme.font}`,
                color: `rgba(${meme.fontColor.r}, ${meme.fontColor.g}, ${meme.fontColor.b}, ${meme.fontColor.a})`,
            }}>{props.meme.sentence1}</p>
            <p className="sentence pos-sentence-sr" style={{
                top: '83%',
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
            <img src={images[meme.image].default} style={style} className={className} alt="if they could read"/>
            <p className="sentence pos-sentence-itcr" style={{
                left: '36%',
                top: '10%',
                fontFamily: `${meme.font}`,
                color: `rgba(${meme.fontColor.r}, ${meme.fontColor.g}, ${meme.fontColor.b}, ${meme.fontColor.a})`,
            }}>{props.meme.sentence1}</p>
            <p className="sentence pos-sentence-itcr" style={{
                left: '58%',
                top: '55%',
                fontFamily: `${meme.font}`,
                color: `rgba(${meme.fontColor.r}, ${meme.fontColor.g}, ${meme.fontColor.b}, ${meme.fontColor.a})`,
            }}>{props.meme.sentence2}</p>
        </>
    );
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Spidermen = (props) => {
    const { meme, style, className } = props;

    return (
        <>
            <img src={images[meme.image].default} style={style} className={className} alt="spidermen"/>
            <p className="sentence pos-sentence-spider" style={{
                left: '14%',
                fontFamily: `${meme.font}`,
                color: `rgba(${meme.fontColor.r}, ${meme.fontColor.g}, ${meme.fontColor.b}, ${meme.fontColor.a})`,
            }}>{props.meme.sentence1}</p>
            <p className="sentence pos-sentence-spider" style={{
                left: '59%',
                fontFamily: `${meme.font}`,
                color: `rgba(${meme.fontColor.r}, ${meme.fontColor.g}, ${meme.fontColor.b}, ${meme.fontColor.a})`,
            }}>{props.meme.sentence2}</p>
        </>
    );
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Lisa = (props) => {
    const { meme, style, className } = props;

    return (
        <>
            <img src={images[meme.image].default} style={style} className={className} alt="lisa"/>
            <p className="sentence pos-sentence-lisa" style={{
                fontFamily: `${meme.font}`,
                color: `rgba(${meme.fontColor.r}, ${meme.fontColor.g}, ${meme.fontColor.b}, ${meme.fontColor.a})`,
            }}>{props.meme.sentence1}</p>
        </>
    );
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const SwimWaterBottle = (props) => {
    const { meme, style, className } = props;

    return (
        <>
            <img src={images[meme.image].default} style={style} className={className} alt="swim water bottle"/>
            <p className="sentence pos-sentence-swim" style={{
                fontFamily: `${meme.font}`,
                color: `rgba(${meme.fontColor.r}, ${meme.fontColor.g}, ${meme.fontColor.b}, ${meme.fontColor.a})`,
            }}>{props.meme.sentence1}</p>
        </>
    );
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const DistractedBoyfriend = (props) => {
    const { meme, style, className } = props;

    return (
        <>
            <img src={images[meme.image].default} style={style} className={className} alt="distracted boyfriend"/>
            <p className="sentence pos-sentence-db" style={{
                left: '17%',
                top: '55%',
                fontFamily: `${meme.font}`,
                color: `rgba(${meme.fontColor.r}, ${meme.fontColor.g}, ${meme.fontColor.b}, ${meme.fontColor.a})`,
            }}>{props.meme.sentence1}</p>
            <p className="sentence pos-sentence-db" style={{
                left: '50%',
                top: '20%',
                fontFamily: `${meme.font}`,
                color: `rgba(${meme.fontColor.r}, ${meme.fontColor.g}, ${meme.fontColor.b}, ${meme.fontColor.a})`,
            }}>{props.meme.sentence2}</p>
            <p className="sentence pos-sentence-db" style={{
                left: '70%',
                top: '53%',
                fontFamily: `${meme.font}`,
                color: `rgba(${meme.fontColor.r}, ${meme.fontColor.g}, ${meme.fontColor.b}, ${meme.fontColor.a})`,
            }}>{props.meme.sentence3}</p>
        </>
    );
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const ExpandingBrain = (props) => {
    const { meme, style, className } = props;

    return (
        <>
            <img src={images[meme.image].default} style={style} className={className} alt="expanding brain"/>
            <p className="sentence pos-sentence-eb" style={{
                top: '1%',
                fontFamily: `${meme.font}`,
                color: `rgba(${meme.fontColor.r}, ${meme.fontColor.g}, ${meme.fontColor.b}, ${meme.fontColor.a})`,
            }}>{props.meme.sentence1}</p>
            <p className="sentence pos-sentence-eb" style={{
                top: '35%',
                fontFamily: `${meme.font}`,
                color: `rgba(${meme.fontColor.r}, ${meme.fontColor.g}, ${meme.fontColor.b}, ${meme.fontColor.a})`,
            }}>{props.meme.sentence2}</p>
            <p className="sentence pos-sentence-eb" style={{
                top: '68%',
                fontFamily: `${meme.font}`,
                color: `rgba(${meme.fontColor.r}, ${meme.fontColor.g}, ${meme.fontColor.b}, ${meme.fontColor.a})`,
            }}>{props.meme.sentence3}</p>
        </>
    );
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mapImagesComponents = {
    "drake.jpg": Drake,
    "spongebobRainbow.jpg": SpongebobRainbow,
    "ifTheyCouldRead.png": IfTheyCouldRead,
    "spidermen.jpg": Spidermen,
    "lisa.jpg": Lisa,
    "swimWaterBottle.jpg": SwimWaterBottle,
    "distractedBoyfriend.jpg": DistractedBoyfriend,
    "expandingBrain.jpg": ExpandingBrain
};

export default MemeWrapper;