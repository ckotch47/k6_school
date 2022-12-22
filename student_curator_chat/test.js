const myOptions = require("../common/option.js");
const settings = require('../common/settings.js');
const testCurator = require('./curator/test.js');
const testStudent = require('./student/test.js');
const mySetup = require('../common/setup.js');

import ws from 'k6/ws';
export const options = myOptions;


export default function () { 

  if(__VU%2 ==0 ){
    let main_data = mySetup.setupCurator()
    ws.connect(settings.wsConnect, {}, function (socket) {
      testCurator.CuratorTest(socket, main_data);
    });
  }
  else{
    let main_data = mySetup.setupStudent();
    ws.connect(settings.wsConnect, {}, function (socket) {
      testStudent.studentTest(socket, main_data);
    });
  }

};
