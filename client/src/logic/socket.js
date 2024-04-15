
import { io } from 'socket.io-client'

// instance socket
let socket;

/**
 * Connect socket
 */
export const connectSocket = () => {
  socket = io('/');
  socket.on('connect', () => {
    console.log('Connected socket !');
  });
  
  socket.onAny((event, data) => {
    console.log(`ws -> ${event}:`, data);
  })
}

/**
 * Return the current socket connection
 */
export const getSocket = () => {
  if (!socket) connectSocket();
  return socket;
}