const writeToCommonChat = require('./student.write.chat.js');


export function StudentTest(socket, main_data){
    
    socket.on('close', (data) => writeToCommonChat.close(data));

    socket.on('2', ()=> writeToCommonChat.pong(socket));

    socket.on('message', (data) => writeToCommonChat.message(socket, data));

    socket.on('open', () => writeToCommonChat.open(socket, main_data.token));  
}