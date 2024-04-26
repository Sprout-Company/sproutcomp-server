
import React from 'react';
import eruda from 'eruda'
import { createRoot } from 'react-dom/client';

import './styles/theme.css' 
import './styles/main.css'
import './styles/font.css'
import './styles/utils.css' 
import './styles/animations.css' 

import App from './App.jsx'

// browser console in development mode
eruda.init();

// render
const root = createRoot(document.getElementById('root'));
root.render(<App/>);