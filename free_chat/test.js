const myOptions = require("./option.js");
const settings = require('../common/settings.js');
const mySetup = require('../common/setup.js');
const testStudent = require('./student/test.js');
const testCurator = require('./curator/test.js');
import ws from 'k6/ws';
export const options = myOptions;


export default function () { 
  let main_data = '';
  if(__VU%3 == 0){
    main_data = mySetup.setupStudentMail({login:'hamhb777@gmail.com',password:'a791c98f-1cd8-4199-a968-28d144df60dd' });
    ws.connect(settings.wsConnect, {}, function (socket) {
      testStudent.studentTest(socket, main_data);
    });
  }
  else if (__VU%3 !=0 && __VU%2 == 0){
    main_data = mySetup.setupStudentMail({login:'artem.trushin97@gmail.com',password:'a791c98f-1cd8-4199-a968-28d144df60dd' });
    ws.connect(settings.wsConnect, {}, function (socket) {
      testStudent.studentTest(socket, main_data);
    });
  }
  else{
    main_data = mySetup.setupCurator();
    ws.connect(settings.wsConnect, {}, function (socket) {
      testCurator.curatorTest(socket, main_data);
    });
  }

 

};
