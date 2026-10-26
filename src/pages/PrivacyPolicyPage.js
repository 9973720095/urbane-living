import React from 'react';
import { FileProtectOutlined } from '@ant-design/icons';
import LegalPage from '../components/LegalPage';
import { privacyPage } from '../data/siteData';

// Privacy Policy: layout in components/LegalPage.jsx, text in data/privacy.js
const PrivacyPolicyPage = () => <LegalPage page={privacyPage} icon={<FileProtectOutlined />} />;

export default PrivacyPolicyPage;