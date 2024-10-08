'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { getAnonymousGames } from '../utils';
import { useUserState } from './UserContext';
import { Loader } from '@/components';

export enum Lobby {
  update = 'lobby:update',
}
export enum Game {
  pendingGame = 'game:pending-one',
  created = 'game:created',
  init = 'game:init-data',
  start = 'game:start',
  shah = 'game:shah',
  mate = 'game:mate',
  draw = 'game:draw',
  rejectDraw = 'game:draw_rejected',
  addTime = 'game:add-time',
  timeTick = 'game:time',
  end = 'game:end',
  strike = 'game:strike',
  boardUpdate = 'game:board-update',
  message = 'game:chat-message',
  surrender = 'game:surrender',
  drawPurpose = 'game:draw_propose',
  playerDiconnected = 'game:opponent-disconnected',
  playerReconected = 'game:player-reconnected',
}
export enum User {
  anonymousToken = 'user:anon-token',
}

export enum Emit {
  createGame = 'create',
  gameJoin = 'join',
  gameRejoin = 'rejoin',
  figureMove = 'move',
  pushMessage = 'chat-message',
  addTime = 'add_time',
  surrender = 'surrender',
  drawPurpose = 'draw_propose',
  drawReject = 'draw_reject',
  drawAccept = 'draw_accept',
  leave = 'leave',
}

export const WebSocketContext = createContext<Socket | null>(null);

export const useWebSocket = (): Socket => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('No context provided');
  }
  return context;
};

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { updateUser } = useUserState();

  const authConnection = (accessToken: string) => {
    return io(
      `${process.env.NEXT_PUBLIC_WS_HOST}/game?Authorization=${accessToken}`,
      {
        transports: ['websocket'],
        retries: 3,
      },
    );
  };

  const anonConnection = () => {
    const anonToken = localStorage.getItem('anon-token');
    const socket = io(
      `${process.env.NEXT_PUBLIC_WS_HOST}/game?Authorization=${anonToken}`,
      {
        transports: ['websocket'],
        retries: 3,
      },
    );
    socket.on(User.anonymousToken, ({ tempToken, userId }) => {
      if (tempToken !== anonToken) {
        localStorage.removeItem('anon-games');
      }
      const gamesStats = getAnonymousGames(userId);
      updateUser({
        userId,
        name: 'Anonymous',
        balance: 0,
        invoices: [],
        winningBalance: 0,
        isAuthorized: false,
        ...gamesStats,
      });
      localStorage.setItem('anon-token', tempToken);
    });
    return socket;
  };

  useEffect(() => {
    // TODO: Potential XSS vulnerability, change it in future
    const accessToken = localStorage.getItem('accessToken');
    let newSocket: Socket;
    if (!accessToken) newSocket = anonConnection();
    else newSocket = authConnection(accessToken);

    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);
  if (!socket) {
    return <Loader />;
  }

  socket.io.on('error', (e) => {
    console.log(e);
  });

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};
