import io from 'socket.io-client';

var socket = null;

export function send(...args) {
  return getSocket().emit(...args);
}

export function getSocket() {
  if (socket == null) {
    socket = io.connect(process.env.SOCKET_URL || 'http://localhost:8081/');
  }
  return socket;
}