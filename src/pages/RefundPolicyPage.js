import React from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import LegalPage from '../components/LegalPage';
import { refundPage } from '../data/siteData';

// Refund & Cancellation Policy: layout in components/LegalPage.jsx, text in data/refund.js
const RefundPolicyPage = () => <LegalPage page={refundPage} icon={<ReloadOutlined />} />;

export default RefundPolicyPage;