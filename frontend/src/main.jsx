import React from 'react'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '../style.css'
import App from './App.jsx'
import { FavoritesProvider } from './contexts/FavoritesContext.jsx'


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <BrowserRouter>
    <AuthProvider>
    <FavoritesProvider>
     <App />
     </FavoritesProvider>
     </AuthProvider>
    </BrowserRouter>
    
  
  </React.StrictMode>
)
