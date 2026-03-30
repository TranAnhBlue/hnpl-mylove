import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LoveSlideshow from './LoveSlideshow.jsx';
import './index.css';

// Simple routing
const path = window.location.pathname;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {path === '/love-slideshow' ? <LoveSlideshow /> : <App />}
  </React.StrictMode>
);
