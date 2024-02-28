// Importing necessary modules from React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';

// Importing styles for the application
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

// Importing the main App component
import App from './App';

// Importing BrowserRouter and ToastContainer from react-router-dom and react-toastify respectively
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";

// Importing the reportWebVitals function
import reportWebVitals from './reportWebVitals';

// Importing styles for the ToastContainer
import "react-toastify/dist/ReactToastify.css";

// Creating a root using ReactDOM.createRoot for rendering the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <App/>

  <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar
  newestOnTop={false}
  closeOnClick
  rtl={false}
  theme="colored"
  />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
