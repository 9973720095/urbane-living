import React from 'react';
import { BookOutlined } from '@ant-design/icons';
import LegalPage from '../components/LegalPage';
import { termsPage } from '../data/siteData';

// Terms & Conditions: layout in components/LegalPage.jsx, text in data/terms.js
const TermsConditionPage = () => <LegalPage page={termsPage} icon={<BookOutlined />} />;

export default TermsConditionPage;