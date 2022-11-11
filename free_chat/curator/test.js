const writeToFreeChat = require('./write.to.free.chat.js');
// const mySetup = require('./setup.js');

export function curatorTest(socket, main_data){
    
    socket.on('close', (data) => writeToFreeChat.close(data));

    socket.on('2', ()=> writeToFreeChat.pong(socket));

    socket.on('message', (data) => writeToFreeChat.message(socket, data));

    socket.on('open', () => writeToFreeChat.open(socket, main_data.token));  
}