export const BackgroundContent = ({
  backgroundColor,
  currentBackgroundType,
  children,
}) => {
  let style = {};
  let ImageBackground = "";
  switch (currentBackgroundType) {
    case "Mesh Gradient": {
      style = {
        backgroundColor: `${backgroundColor[2]}`,
        backgroundImage: ` radial-gradient(at 47% 33%, ${backgroundColor[0]} 0, transparent 59%), 
        radial-gradient(at 82% 65%, ${backgroundColor[1]} 0, transparent 55%)`,
      };
      break;
    }
    case "Solid": {
      style = {
        backgroundColor: `${backgroundColor[0]}`,
      };
      break;
    }
    case "Image": {
      ImageBackground = "imageBackgroundSetting";
      break;
    }
    default:
      return null;
  }

  console.log("render background content?");

  return (
    <div
      className={`backgroundSetting ${ImageBackground}`}
      style={{ ...style }}>
      {children}
    </div>
  );
};
