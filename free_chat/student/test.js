const writeTofreeChat = require('./write.to.free.chat.js');

export function studentTest(socket, main_data) { 

    socket.on('close', (data) => writeTofreeChat.close(data));
    
    socket.on('2', ()=> writeTofreeChat.pong(socket));

    socket.on('message', (data) => writeTofreeChat.message(socket, data));

    socket.on('open', () => writeTofreeChat.open(socket, main_data.token));  
};
