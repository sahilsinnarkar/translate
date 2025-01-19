import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Custom CSS
import App from './App.jsx'; // Ensure this path is correct
import { BrowserRouter as Router } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; // FontAwesome for icons
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap for styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>
);
