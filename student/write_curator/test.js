const writeCurator = require('./write.to.curator.js');

export function studentTest(socket, main_data) {
    socket.on('close', (data) => writeCurator.close(data));
    
    socket.on('2', ()=> writeCurator.pong(socket));

    socket.on('message', (data) => writeCurator.message(socket, data));

    socket.on('open', () => writeCurator.open(socket, main_data.token));  
}