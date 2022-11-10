

const myOptions = require("./option.js");
const mySetup = require('./setup.js');
const settings = require('../common/settings.js');
const writeCurator = require('./write.curator.js');

import ws from 'k6/ws';
export const options = myOptions;

export function setup(){
    return mySetup.setup()
}

export default function (main_data) { 
    
  ws.connect(settings.wsConnect, {}, function (socket) {
    socket.on('close', (data) => writeCurator.close(data));
    socket.on('2', ()=> writeCurator.pong(socket));

    socket.on('message', (data) => writeCurator.message(socket, data));

    socket.on('open', () => writeCurator.open(socket, main_data.token));  
  });

};
