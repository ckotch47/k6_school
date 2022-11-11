import { sleep } from 'k6';


const studentChat = {
    index: 1,
    userId: 'baea9cd0-2eb7-42b9-b040-9c7a42b11531',
    type: 'CURATOR',
    groupId: '',
    conversationId: ''
}

class WriteToStudent{
    close(data){

    };

    pong(socket){
        socket.send('3');
    }

    open(socket, token){
        socket.send(`40/chat,{"token":"Bearer ${token}"}`);
        sleep(1);
        socket.send(`42/chat,["get_contacts"]`);
    }

    message(socket, data){
        if(data){
            let recv = this.spitMessage(data)
            if(recv.func === 'exception'){
                socket.send('close');
            }
            switch(recv.namespace){
              case 'chat':
                if(recv.func === 'show_contacts'){
                    studentChat.index = recv.massage.findIndex((val)=>val.type==='CURATOR' && val.user.id === studentChat.userId)
                    studentChat.userId = recv.massage[studentChat.index].user.id;
                    studentChat.groupId = recv.massage[studentChat.index].group.id;
                    socket.send(`42/chat,["select_contact", ${JSON.stringify({
                        groupId: studentChat.groupId,
                        id: null,
                        relationUserId: null,
                        type: studentChat.type,
                        userId: studentChat.userId
                    })}]`);
                }
                if(recv.func === 'open_chat'){
                    studentChat.conversationId = recv.massage.conversationId;
                    socket.send(`42/chat,["join",${JSON.stringify({
                        conversationId: studentChat.conversationId
                    })}]`);
                    // 
                }
                if(recv.func === 'joined'){
                    socket.send(`42/chat,["get_history", ${JSON.stringify({
                        conversationId: studentChat.conversationId,
                        limit: 1,
                    })}]`)
                }
                if(recv.func === 'show_history'){
                    socket.send(`42/chat,["send_message", ${JSON.stringify({
                        conversationId: studentChat.conversationId,
                        text: 'socket k6 load - curator',
                        uploads: [],
                    })}]`)
                }
                if(recv.func === 'new_message'){
                    // console.log('new_message');
                    socket.send('close');
                }
            }
          }
    }

    spitMessage(str){
        let recv = {
          namespace: '',
          func: '',
          massage: [],
        };
        let temp = str.split('/')[1];
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
          let tmp;
            if(recv.func == 'show_contacts'){
                tmp = str.slice(0,-1).match(/\[{.+}]/gm)
                if(tmp){
                    recv.massage = JSON.parse(tmp[0]);
                }
            }
            if(recv.func == 'open_chat' || recv.func == 'joined'){
                tmp = str.match(/{.+}/gm)
                if(tmp)
                    recv.massage = JSON.parse(tmp);
            }       
        }
        return recv;
      }
}
module.exports = new WriteToStudent()