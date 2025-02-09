import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';
import { DarkLightThemeProvider } from "./Context/DarkLightThemeContext";

ReactDOM.render(
  <DarkLightThemeProvider>
    <App />
  </DarkLightThemeProvider>,
  document.getElementById("root")
);

