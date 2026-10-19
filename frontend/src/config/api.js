// Single place for the backend URL: local server on localhost, Render in production
export const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'https://urbane-living.onrender.com';
