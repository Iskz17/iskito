import { IsNullOrUndefined, convertHexToRGB } from "../../../utils/utils";

export const GlassmorphismBoxLogic = ({
    setCardColor,
    setBackgroundColor,
    setBlurVal,
    setOpacityVal,
    setSaturationVal,
    setCurrentBackgroundType,
    setCurrentCardType,
    backgroundColor }) => {

    const convertToRgbWithOpacity = (hexColor, opacity) => {
        const [r, g, b] = convertHexToRGB(hexColor);
        return `rgba(${r},${g},${b}, ${opacity / 100})`;
    };
    const handleColorChange = (e, index = null) => {
        if (IsNullOrUndefined(index)) {
            setCardColor(e.target.value);
            return;
        }
        let bgColorArr = [...backgroundColor];
        bgColorArr[index] = e.target.value;
        setBackgroundColor([...bgColorArr]);
    };
    const handleChangeBlur = (newValue) => {
        setBlurVal(newValue.target.value);
    };
    const handleChangeOpacity = (newValue) => {
        setOpacityVal(newValue.target.value);
    };
    const handleChangeSaturation = (newValue) => {
        setSaturationVal(newValue.target.value);
    };

    const handleChangeBackground = (event) => {
        setCurrentBackgroundType(event.target.value);
    };

    const handleChange = (event) => {
        setCurrentCardType(event.target.value);
    };

    return {
        handleChange,
        handleChangeBackground,
        handleChangeSaturation,
        handleChangeBlur,
        handleChangeOpacity,
        handleColorChange,
        convertToRgbWithOpacity
    }
}

