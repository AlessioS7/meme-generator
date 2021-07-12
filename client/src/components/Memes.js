function importAll(r) {
    let images = {};
    r.keys().map((item, index) => images[item.replace('./', '')] = r(item));
    return images;
}
// Importing all the template images from the images folder
const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

// MemeWrapper component (based on the image of the meme it renders the specific meme component)
const MemeWrapper = (props) => {

    return mapImagesComponents[props.meme.image] ? mapImagesComponents[props.meme.image](props) : <></>;
}

// Drake meme component
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

// SpongebobRainbow meme component
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
                top: '81%',
                fontFamily: `${meme.font}`,
                color: `rgba(${meme.fontColor.r}, ${meme.fontColor.g}, ${meme.fontColor.b}, ${meme.fontColor.a})`,
            }}>{props.meme.sentence2}</p>
        </>
    );
}

// // IfTheyCouldRead meme component
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

// Spidermen meme component
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

// Lisa meme component
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

// SwimWaterBottle meme component
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

// DistractedBoyfriend meme component
const DistractedBoyfriend = (props) => {
    const { meme, style, className } = props;

    return (
        <>
            <img src={images[meme.image].default} style={style} className={className} alt="distracted boyfriend"/>
            <p className="sentence pos-sentence-db" style={{
                left: '16%',
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

// ExpandingBrain meme component
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

// mapImagesComponents meme component
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