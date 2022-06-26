const WebSocket = require('ws');
const logger = require('../../../config/logger');

module.exports = (expressServer) => {
  const websocketServer = new WebSocket.Server({
    noServer: true,
    path: '/chat',
  });

  expressServer.on('upgrade', (request, socket, head) => {
    websocketServer.handleUpgrade(request, socket, head, (websocket) => {
      websocketServer.emit('connection', websocket, request);
    });
  });

  websocketServer.on('connection', (websocketConnection) => {
    websocketConnection.on('message', (message) => {
      logger.info(`Websocket message: ${message}`);
      websocketServer.clients.forEach((client) => {
        if (client !== websocketConnection && client.readyState === WebSocket.OPEN) {
          client.send(message, { binary: false });
        }
      });
    });
  });

  return websocketServer;
};
