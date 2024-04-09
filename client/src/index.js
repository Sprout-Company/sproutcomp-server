
import React from 'react';
import eruda from 'eruda'
import { createRoot } from 'react-dom/client';

import './styles/main.css'
import 'bootstrap/dist/css/bootstrap.css'

import App from  './App.jsx'

// browser console in development mode
eruda.init();

// render
const root = createRoot(document.getElementById('root'));
root.render(<App/>);