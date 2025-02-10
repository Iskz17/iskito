import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';
import { DarkLightThemeProvider } from "./context/DarkLightThemeContext";

ReactDOM.render(
  <DarkLightThemeProvider>
    <App />
  </DarkLightThemeProvider>,
  document.getElementById("root")
);

