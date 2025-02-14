import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './Layout.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
