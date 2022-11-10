const Settings = {
    protocolHttp: 'http',
    protocolWs: 'ws',
    host: 'localhost',
    port: '3000',

    wsConnect: `ws://localhost:3000/socket.io/?EIO=4&transport=websocket`,
    httpConnect: `http://localhost:3000`,
}

module.exports = Settings;