import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import LegalPage from '../components/LegalPage';
import { disclaimerPage } from '../data/siteData';

// Disclaimer: layout in components/LegalPage.jsx, text in data/disclaimer.js
const DisclaimerPage = () => <LegalPage page={disclaimerPage} icon={<InfoCircleOutlined />} />;

export default DisclaimerPage;