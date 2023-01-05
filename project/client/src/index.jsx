import React from 'react';
import App from './App';
import "./style.css";
import {createRoot}  from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom";

const root = createRoot(document.getElementById("root"))
root.render
  (
    <Router>
        <App />
    </Router>
  )

