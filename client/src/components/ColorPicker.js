import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

// ColorPicker component
const ColorPicker = (props) => {
    const { textColor, setTextColor } = props;

    const handleClick = () => {
        setTextColor({ displayColorPicker: !textColor.displayColorPicker, color: textColor.color })
    };

    const handleClose = () => {
        setTextColor({ displayColorPicker: false, color: textColor.color })
    };

    const handleChange = (color) => {
        setTextColor({ displayColorPicker: textColor.displayColorPicker, color: color.rgb })
    };

    const styles = reactCSS({
        'default': {
            color: {
                width: '36px',
                height: '14px',
                borderRadius: '2px',
                background: `rgba(${textColor.color.r}, ${textColor.color.g}, ${textColor.color.b}, ${textColor.color.a})`,
            },
            swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
            },
            popover: {
                position: 'absolute',
                top: '2.2em',
                zIndex: '2',
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
        },
    });

    // JSX
    return (
        <>
            <div style={styles.swatch} onClick={handleClick} className="text-secondary">
                <div style={styles.color} />
            </div>
            {textColor.displayColorPicker ? <div style={styles.popover} >
                <div style={styles.cover} onClick={handleClose} />
                <SketchPicker color={textColor.color} onChange={handleChange} />
            </div> : null}
        </>
    );
}


export default ColorPicker;