'use client'
import { useWebSocket } from "../lib/context/SocketContext";

export default function Page() {
  const socket = useWebSocket();
  return <p>
    Game page
  </p>;
}