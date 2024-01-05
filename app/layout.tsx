import { WebSocketProvider } from './lib/context/SocketContext';
import { Navbar } from "@/components/Navbar/Navbar";

import './globals.css';
import React from 'react';
import { UserProvider } from './lib/context/UserContext';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <UserProvider>
          <Navbar/>
          <WebSocketProvider>
            {children}
          </WebSocketProvider>
        </UserProvider>
      </body>
    </html>
  );
}
