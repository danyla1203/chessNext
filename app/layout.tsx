import { WebSocketProvider } from './lib/context/SocketContext';
import { UserProvider } from "./lib/context/UserContext";

import './globals.css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <WebSocketProvider>
          <UserProvider>{children}</UserProvider>
        </WebSocketProvider>
      </body>
    </html>
  );
}
