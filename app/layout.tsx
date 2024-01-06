import { WebSocketProvider } from './lib/context/SocketContext';
import { Navbar } from "@/components/Navbar/Navbar";

import './globals.css';
import React from 'react';
import { UserProvider } from './lib/context/UserContext';
import { NotificationProvider } from './lib/context/NotificationContext';
import Notifications from './components/Notification/Notification';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <NotificationProvider>
          <UserProvider>
            <Navbar/>
            <Notifications />
            <WebSocketProvider>
              {children}
            </WebSocketProvider>
          </UserProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
