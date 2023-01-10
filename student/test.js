const myOptions = require("../common/option.js");
const settings = require('../common/settings.js');
const testStudent = require('./write_curator/test.js');
const mySetup = require('../common/setup.js');

import ws from 'k6/ws';
export const options = myOptions;


export default function () { 
    let token;
    let users = mySetup.studentFromFile();
    if(__VU > users.length ) token = users[__VU % users.length];
    else token = users[__VU];

    if(!token){
        token = users[0];
    }

    ws.connect(settings.wsConnect, {}, function (socket) {
      testStudent.studentTest(socket, token);
    });


};
