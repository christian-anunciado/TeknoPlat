import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HMSRoomProvider } from "@100mslive/react-sdk";
import { AuthProvider } from './context/AuthContext';
import { SessionContextProvider } from './context/SessionContext';
import Notification from './components/Notifcation/Notifcation';
import { DarkModeContextProvider } from "./context/darkModeContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>

    <React.StrictMode>
      <HMSRoomProvider>
        <SessionContextProvider>
          <DarkModeContextProvider>
          <App />
          </DarkModeContextProvider>
          <Notification />
        </SessionContextProvider>
      </HMSRoomProvider>
    </React.StrictMode>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
