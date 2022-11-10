import ws from 'k6/ws';
import { sleep } from 'k6';
import http from 'k6/http';

function splitMSG(str){
  let temp = str.split('/')[1];
  let recv = {
    namespace: '',
    func: '',
    massage: '',
  };
  if(typeof temp == 'string'){
    try{
      recv.namespace = temp.split(',')[0];
    }catch (e){
      recv.namespace = '';
    }
    try{
      recv.func = temp.split(',')[1].replace(/[["]/gi, '').split(',')[0].replace(']', '');
    }catch (e){
      recv.func = '';
    }
    try{
      recv.massage = JSON.parse(temp.match(/{["',:-_a-z{}0-9-.\/A-ZА-Яа-я &]*}/gm))
    }catch (e){
      recv.massage = '';
    }
  }
  return recv;
}

export const options = {
  vus: 600,
  duration: '10m',
};



export function setup() {
    const url = 'http://localhost:3000/api/auth';
    const payload ={
      login: "hamhb777@gmail.com",
      password: "a791c98f-1cd8-4199-a968-28d144df60dd",
    };
  
    return  {token: http.post(url, payload).json().accessToken};
  };



export default function (main_data) { 

  // notification
  ws.connect('ws://localhost:3000/socket.io/?EIO=4&transport=websocket', {}, function (socket) {

    socket.on('close', (data) => console.log(data));
    socket.on('2', ()=>{
      socket.send('3');
    });

    socket.on('message', (data) => {
      if(data){
        let recv = splitMSG(data)
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
    });

    socket.on('open', function open(){
      console.log('socket notification is oppened');
      socket.send(`40/notification,{"token":"Bearer ${main_data.token}"}`);
      sleep(1);
      socket.send(`42/notification,["get_notifications"]`);
    });  
  });
  // chat
  ws.connect('ws://localhost:3000/socket.io/?EIO=4&transport=websocket', {}, function (socket) {
    socket.on('close', (data) => console.log(data));
    socket.on('2', ()=>{
      socket.send('3');
    });

    socket.on('message', (data) => {
      if(data){
        let recv = splitMSG(data);
        if(recv.func === 'exception'){
          console.log(recv.massage);
          socket.send('close');
        }
        switch(recv.namespace){
          case 'chat':
            switch(recv.func){
              case 'show_contacts':
                socket.send('42/chat,["select_contact",{"type":"CURATOR","userId":"dfdf66e6-b50d-4b2c-b062-22f305bb1444","groupId":null,"relationUserId":null}]');
              case 'open_chat':
                sleep(1);
                socket.send('42/chat,["join",{"conversationId":"27829b6b-095c-4511-94ab-2accb06074ee"}]');
              case 'joined':
                socket.send('42/chat,["send_message",{"conversationId":"27829b6b-095c-4511-94ab-2accb06074ee","text":"socket load test","uploads":[]}]');
              case 'show_history':
                socket.send('close');
              case 'message_sent':
                socket.send('42/chat,["get_history",{"conversationId":"27829b6b-095c-4511-94ab-2accb06074ee","limit":100}]');
                sleep(1);
          }
        }
      }
    });

    socket.on('open', function open(){
      console.log('socket chat is oppened');
      socket.send(`40/chat,{"token":"Bearer ${main_data.token}"}`);
      sleep(1);
      socket.send(`42/chat,["get_contacts"]`);
    });  
  });

  ws.connect('ws://localhost:3000/socket.io/?EIO=4&transport=websocket', {}, function (socket) {
    socket.on('close', (data) => console.log(data));
    socket.on('2', ()=>{
      socket.send('3');
    });

    socket.on('message', (data) => {
      if(data){
        let recv = splitMSG(data);
        if(recv.func === 'exception'){
          socket.send('close');
        }
        console.log(recv);
        switch(recv.namespace){
          case 'test-passing':
            switch(recv.func){
              case 'attempt_started':
                socket.send('42/test-passing,["see_question",{"testId":"bbe4ae32-3b08-48f8-98b0-999f4f6e9838","questionId":"2361dffa-2161-48b0-8506-8bae5d9f015a"}]');
                sleep(1);
                socket.send('42/test-passing,["answer_question",{"questionId":"2361dffa-2161-48b0-8506-8bae5d9f015a","testId":"bbe4ae32-3b08-48f8-98b0-999f4f6e9838","answers":[{"optionId":"72ca98ab-ff5e-4727-9bd2-5187fef845f5","correct":true}]}]');
                sleep(1);
                socket.send('42/test-passing,["see_question",{"testId":"bbe4ae32-3b08-48f8-98b0-999f4f6e9838","questionId":"57d6723b-8c2f-416d-8b21-c88c50a3eaef"}]');
                sleep(1);
                socket.send('42/test-passing,["answer_question",{"questionId":"57d6723b-8c2f-416d-8b21-c88c50a3eaef","testId":"bbe4ae32-3b08-48f8-98b0-999f4f6e9838","answers":[{"value":"3","optionId":"63ccd73e-255e-428e-a7c9-9edd6d0577ce"}]}]');
                sleep(1);
                socket.send('42/test-passing,["see_question",{"testId":"bbe4ae32-3b08-48f8-98b0-999f4f6e9838","questionId":"a7e168da-9313-421d-b5c2-8ce14882259d"}]');
                sleep(1);
                socket.send('42/test-passing,["answer_question",{"questionId":"a7e168da-9313-421d-b5c2-8ce14882259d","testId":"bbe4ae32-3b08-48f8-98b0-999f4f6e9838","answers":[{"optionId":"39d75642-8203-474d-808d-f21f8fefd4d3","correct":true}]}]');
                sleep(1);
                socket.send('42/test-passing,["see_question",{"testId":"bbe4ae32-3b08-48f8-98b0-999f4f6e9838","questionId":"570354bf-dd33-4162-a9db-9f0a2829cf59"}]');
                sleep(1);
                socket.send('42/test-passing,["answer_question",{"questionId":"570354bf-dd33-4162-a9db-9f0a2829cf59","testId":"bbe4ae32-3b08-48f8-98b0-999f4f6e9838","answers":[{"value":"4","optionId":"722c5c91-dd63-4c80-9049-08b76e0e6704"}]}]');
                sleep(1);
                socket.send('42/test-passing,["answer_question",{"questionId":"a1872d46-59b2-44f7-9063-e5b0fd59b656","testId":"bbe4ae32-3b08-48f8-98b0-999f4f6e9838","answers":[{"optionId":"04e1f139-2174-45d1-b771-2fb3f96a95d2","correct":true}]}]');
                sleep(1);
                socket.send('42/test-passing,["see_question",{"testId":"bbe4ae32-3b08-48f8-98b0-999f4f6e9838","questionId":"c838c978-1ac1-4c99-9372-eb8ba02da9ef"}]');
                sleep(1);
                socket.send('42/test-passing,["answer_question",{"questionId":"c838c978-1ac1-4c99-9372-eb8ba02da9ef","testId":"bbe4ae32-3b08-48f8-98b0-999f4f6e9838","answers":[{"optionId":"4f66f906-edcc-47d2-b174-8c1027bccea0","correctPosition":1},{"optionId":"c7ff1b8d-aced-4c7b-b14f-1cb6ebfc457d","correctPosition":2},{"optionId":"00610817-7e9f-435c-8a0a-eca569526de3","correctPosition":3},{"optionId":"f805d623-8fea-4534-8612-cbb5366858dd","correctPosition":4},{"optionId":"b0b2760b-bfb0-4c52-8b76-5d18165ae850","correctPosition":5},{"optionId":"de9a7ed5-4dd1-41c5-aa80-098c6904319e","correctPosition":6}]}]');
                sleep(1);
                socket.send('42/test-passing,["answer_question",{"questionId":"60a42652-c124-4d86-a6b6-2ef2e6db6b77","testId":"bbe4ae32-3b08-48f8-98b0-999f4f6e9838","answers":[{"optionId":"768c85ae-9e4c-432a-be4e-049dfc02f547","correct":true}]}]');
                sleep(1);
                socket.send('42/test-passing,["see_question",{"testId":"bbe4ae32-3b08-48f8-98b0-999f4f6e9838","questionId":"ac559a77-9e99-451e-80be-64444fd1a133"}]');
                sleep(1);
                socket.send('42/test-passing,["answer_question",{"questionId":"ac559a77-9e99-451e-80be-64444fd1a133","testId":"bbe4ae32-3b08-48f8-98b0-999f4f6e9838","answers":[{"optionId":"b471395f-437a-4b7f-b945-39926ee07bd1","correct":true}]}]');
                sleep(1);
                socket.send('42/test-passing,["see_question",{"testId":"bbe4ae32-3b08-48f8-98b0-999f4f6e9838","questionId":"d7c5b8dd-daf7-4315-9411-31a8a44ebf6a"}]');
                sleep(1);
                socket.send('42/test-passing,["answer_question",{"questionId":"d7c5b8dd-daf7-4315-9411-31a8a44ebf6a","testId":"bbe4ae32-3b08-48f8-98b0-999f4f6e9838","answers":[{"optionId":"1159d14f-9a18-406b-b6ba-241aceaa1851","correct":true}]}]');
                sleep(1);
                socket.send('42/test-passing,["see_question",{"testId":"bbe4ae32-3b08-48f8-98b0-999f4f6e9838","questionId":"11a56b11-a7ff-4d6d-a68e-c8d93d1313f5"}]');
                sleep(1);
                socket.send('42/test-passing,["answer_question",{"questionId":"11a56b11-a7ff-4d6d-a68e-c8d93d1313f5","testId":"bbe4ae32-3b08-48f8-98b0-999f4f6e9838","answers":[{"optionId":"df3fed68-c1fd-4318-9376-9287ef5eb4cf","correct":true}]}]');
                
            }
        }
      }
    });

    socket.on('open', function open(){
      console.log('socket is oppened');
      socket.send(`40/test-passing,{"token":"Bearer ${main_data.token}"}`);
      sleep(1);
      socket.send('42/test-passing,["start_attempt",{"testId":"bbe4ae32-3b08-48f8-98b0-999f4f6e9838"}]');
    });  
  });
};