import * as React from "react";
import { forwardRef, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useDarkLightTheme } from "../../Context/DarkLightThemeContext";
import { useTheme } from "@mui/material/styles";

const PrimaryButton = forwardRef(({ children, ...other }, ref) => {
  const theme = useTheme();
  const [isDarkMode] = useDarkLightTheme();
  const [themeId, setThemeId] = useState(isDarkMode? 'dark' : 'light');

  useEffect(() => {
    setThemeId(isDarkMode? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <Button
      ref={ref}
      {...other}
      sx={{
        fontFamily: 'Gilroy',
        backgroundColor: theme[themeId].button.primary.main,
        '&:hover': {
          backgroundColor: theme[themeId].button.primary.hover,
        },
        textTransform: 'none',
        width: '50%',
      }}
    >
      {children}
    </Button>
  );
});

export { PrimaryButton }; // Exporting PrimaryButton

export function SecondaryButton({ children, ...other }) {
  const theme = useTheme();
  const [isDarkMode] = useDarkLightTheme();
  const [themeld, setThemeld] = useState("light");

  useEffect(() => {
    setThemeld(isDarkMode? "dark" : "light");
  }, [isDarkMode]);

  return (
    <Button
      {...other}
      sx={{
        fontFamily:"Gilroy",
        textTransform: "none",
        width: "50%",
        backgroundColor: theme[themeld].button.secondary.main,
        "&:hover": {
          backgroundColor: theme[themeld].button.secondary.hover,
          color: theme[themeld].button.secondary.hoverText,
        },
        color: theme[themeld].button.secondary.mainText,
      }}
    >
      {children}
    </Button>
  );
}
