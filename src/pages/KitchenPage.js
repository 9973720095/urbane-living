import React from 'react';
import RoomPage from '../components/RoomPage';
import { kitchenPage } from '../data/siteData';

// Modular kitchen page: layout in components/RoomPage.jsx, text in data/rooms/kitchen.js
const KitchenPage = ({ onOpenForm }) => <RoomPage page={kitchenPage} onOpenForm={onOpenForm} />;

export default KitchenPage;