const writeToStudent = require('./write.to.student.js');
// const mySetup = require('./setup.js');

export function CuratorTest(socket, main_data){
    
    socket.on('close', (data) => writeToStudent.close(data));

    socket.on('2', ()=> writeToStudent.pong(socket));

    socket.on('message', (data) => writeToStudent.message(socket, data));

    socket.on('open', () => writeToStudent.open(socket, main_data.token));  
}