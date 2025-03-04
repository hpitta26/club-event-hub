import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css' // global stylesheet

import App from './Layout.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
