import React from 'react';
import './NotFound.css';

function NotFound() {
  return (
    <div className="NotFound">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button onClick={() => window.location.href = '/'}>Go Back Home</button>
    </div>
  );
}

export default NotFound;
