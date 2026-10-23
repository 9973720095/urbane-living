import React from 'react';
import RoomPage from '../components/RoomPage';
import { livingPage } from '../data/siteData';

// Living room page: layout in components/RoomPage.jsx, text in siteData.js -> livingPage
const LivingHallPage = ({ onOpenForm }) => <RoomPage page={livingPage} onOpenForm={onOpenForm} />;

export default LivingHallPage;