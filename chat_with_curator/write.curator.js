import { sleep } from 'k6';

const common = require('../common/split.message.js');

class WriteCurator{
    close(data) {
        // console.log(data);
    };
    
    pong(socket){
        socket.send('3');
    };

    open(socket, token){
        socket.send(`40/notification,{"token":"Bearer ${token}"}`);
        sleep(1);
        socket.send(`42/notification,["get_notifications"]`);
    };

    message(socket, data){
        if(data){
            let recv = common.spitMessage(data)
            if(recv.func === 'exception'){
                socket.send('close');
            }
            switch(recv.namespace){
              case 'notification':
                if(recv.func === 'notifications_received'){
                  socket.send('close');
                }
            }
          }
    }
}

module.exports = new WriteCurator()