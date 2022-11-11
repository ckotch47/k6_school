const myOptions = require("./option.js");
const settings = require('../common/settings.js');
const mySetup = require('../common/setup.js');
const testCurator = require('./curator/test.js');
const testStudent = require('./students/test.js');
const testTeacher = require('./teacher/test.js');

import ws from 'k6/ws';
export const options = myOptions; 

export default function () { 
    if(__VU%3 == 0 ){
        let main_data = mySetup.setupTeacher()
        ws.connect(settings.wsConnect, {}, function (socket) {
          testTeacher.TeacherTest(socket, main_data);
        });
    }
    else if(__VU%3 != 0 && __VU%2 == 0){
        let main_data = mySetup.setupStudent()
        ws.connect(settings.wsConnect, {}, function (socket) {
            testStudent.StudentTest(socket, main_data);
        });
    }
    else{
        let main_data = mySetup.setupCurator()
        ws.connect(settings.wsConnect, {}, function (socket) {
          testCurator.CuratorTest(socket, main_data);
        });
    }
  
  };
  