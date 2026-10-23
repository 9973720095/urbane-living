import React from 'react';
import RoomPage from '../components/RoomPage';
import { bedroomPage } from '../data/siteData';

// Bedroom page: layout in components/RoomPage.jsx, text in siteData.js -> bedroomPage
const BedroomPage = ({ onOpenForm }) => <RoomPage page={bedroomPage} onOpenForm={onOpenForm} />;

export default BedroomPage;