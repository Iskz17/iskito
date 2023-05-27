// MyContext.jsx
// https://upmostly.com/tutorials/how-to-use-the-usecontext-hook-in-react
// https://iamtimsmith.com/blog/how-to-use-react-context/
import React, {createContext, useState} from 'react';

const AppContext = createContext([{isDarkMode: false}, () => {}]);

const AppContextProvider = ({children}) => {
	const [state, setState] = useState({isDarkMode: false});

	return (
		<AppContext.Provider value={[state, setState]}>
			{children}
		</AppContext.Provider>
	)
}

export {AppContext, AppContextProvider};