'use client'

import { useWebSocket } from "./lib/context/SocketContext";
import { Navbar } from "./ui/Navbar/Navbar";

export default function Page() {
  const socket = useWebSocket();
  return (
    <main>
      <Navbar/>
      Main
    </main>
  );
}
