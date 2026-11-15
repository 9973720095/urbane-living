// Sends the admin's Google (Firebase) login token with every request to our backend,
// so the backend can allow admin-only actions (leads, add / edit / delete designs and blogs).
// Visitors are not logged in, so their requests stay exactly the same.
import axios from 'axios';
import { message } from 'antd';
import { auth } from '../firebase';
import { API_BASE_URL } from '../data/siteData';

let installed = false;

export const installAdminAuth = () => {
  if (installed) return;
  installed = true;

  axios.interceptors.request.use(async (config) => {
    const user = auth.currentUser;
    const url = config.url || '';
    if (user && url.startsWith(API_BASE_URL)) {
      const token = await user.getIdToken(); // Firebase refreshes it automatically when it expires
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      const status = err.response && err.response.status;
      if ((status === 401 || status === 403) && window.location.pathname.startsWith('/admin')) {
        message.error(err.response.data?.error || 'Admin access denied. Please log in again.');
      }
      return Promise.reject(err);
    },
  );
};

installAdminAuth();