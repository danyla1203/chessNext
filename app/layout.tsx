import { WebSocketProvider } from './lib/context/SocketContext';
import { Navbar } from "./ui/Navbar/Navbar";

import './globals.css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Navbar/>
        <WebSocketProvider>
          {children}
        </WebSocketProvider>
      </body>
    </html>
  );
}
