import React from 'react'
import ReactDOM from 'react-dom/client'
import Body from './page/Body.jsx'
import './index.css'
import "./app.postcss";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MetaMaskProvider } from 'metamask-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer limit={5} newestTop />
    <MetaMaskProvider>
      <Body />
    </MetaMaskProvider>
  </React.StrictMode>,
)
