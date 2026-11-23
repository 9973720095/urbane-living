import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ConfigProvider } from 'antd';
import { loadImageOverrides } from './utils/siteImages';
import { loadPageSections } from './utils/pageSections';
import { startSwipeHints } from './utils/swipeHints';
import { startMailHelper } from './utils/mailHelper';
import reportWebVitals from './reportWebVitals';

// Poppins font + logo red for all antd components (buttons, menu, forms)
const theme = {
  token: {
    fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    colorPrimary: '#E40B12',
    colorLink: '#4167B3',
  },
};

// Pre-rendered pages (scripts/prerender.js) carry a saved copy of the page's structured data.
// The app adds the live version itself, so the saved copy is removed first (no duplicates).
document.querySelectorAll('script[data-prerendered]').forEach((s) => s.remove());

// Admin photo changes + admin page sections are loaded first, then the app
// (its page data picks the photos when it loads)
Promise.all([loadImageOverrides(), loadPageSections()]).then(() => {
  const App = require('./App').default; // eslint-disable-line global-require
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <ConfigProvider theme={theme}>
        <App />
      </ConfigProvider>
    </React.StrictMode>
  );
  startSwipeHints(); // fade + small peek on sideways lists, so visitors know there is more
  startMailHelper(); // email links: copy the address + Gmail / Outlook buttons when no mail app opens
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();