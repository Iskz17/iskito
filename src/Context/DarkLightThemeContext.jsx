// MyContext.jsx
// https://upmostly.com/tutorials/how-to-use-the-usecontext-hook-in-react
// https://iamtimsmith.com/blog/how-to-use-react-context/
import React, {createContext, useState, useContext} from 'react';

const DarkLightThemeContext = createContext([{isDarkMode: false}, () => {}]);

export const DarkLightThemeProvider = ({children}) => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	return (
		<DarkLightThemeContext.Provider value={[isDarkMode, setIsDarkMode]}>
			{children}
		</DarkLightThemeContext.Provider>
	)
}

export const useDarkLightTheme = () => useContext(DarkLightThemeContext);