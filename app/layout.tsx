import { WebSocketProvider } from './lib/context/SocketContext';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WebSocketProvider>
      <html>
        <body>{ children }</body>
      </html>
    </WebSocketProvider>
  );
}
