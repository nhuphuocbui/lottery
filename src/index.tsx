import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { AuthProvider } from './context/auth/AuthProvider';
import { GeneralProvider } from './context/GeneralContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider >
      <GeneralProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GeneralProvider>
    </AuthProvider>
    <ToastContainer/>
  </React.StrictMode>
);
