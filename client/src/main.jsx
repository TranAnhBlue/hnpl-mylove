import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LoveSlideshow from './LoveSlideshow.jsx';
import './index.css';

// Simple routing with hash
const getComponent = () => {
  const path = window.location.pathname;
  const hash = window.location.hash;
  
  // Support both /love-slideshow and /#/love-slideshow
  if (path === '/love-slideshow' || hash === '#/love-slideshow') {
    return <LoveSlideshow />;
  }
  
  return <App />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {getComponent()}
  </React.StrictMode>
);
