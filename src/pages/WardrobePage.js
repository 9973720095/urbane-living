import React from 'react';
import RoomPage from '../components/RoomPage';
import { wardrobePage } from '../data/siteData';

// Wardrobe page: layout in components/RoomPage.jsx, text in data/rooms/wardrobe.js
const WardrobePage = ({ onOpenForm }) => <RoomPage page={wardrobePage} onOpenForm={onOpenForm} />;

export default WardrobePage;