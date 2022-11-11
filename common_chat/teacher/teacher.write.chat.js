import { sleep } from 'k6';


const commonChat = {
    index: -1,
    id: '',
    type: 'FREE',
    groupId: '',
    conversationId: ''
}
class WriteToCurator{
    close(data) {
        // console.log(data);
    };
    
    pong(socket){
        socket.send('3');
    };

    open(socket, token){
        socket.send(`40/chat,{"token":"Bearer ${token}"}`);
        sleep(1);
        socket.send(`42/chat,["get_contacts"]`);
    };

    message(socket, data){
        if(data){
            let recv = this.spitMessage(data)
            if(recv.func === 'exception'){
                socket.send('close');
            }
            switch(recv.namespace){
              case 'chat':
                if(recv.func === 'show_contacts'){
                    commonChat.index = recv.massage.findIndex((val)=>val.type==='FREE' && val.name == 'load test')
                    commonChat.id = recv.massage[commonChat.index].id;
                    socket.send(`42/chat,["select_contact", ${JSON.stringify({
                        groupId: null,
                        id: commonChat.id,
                        relationUserId: null,
                        type: commonChat.type,
                        userId: null
                    })}]`);
                }
                if(recv.func === 'open_chat'){
                    commonChat.conversationId = recv.massage.conversationId;
                    socket.send(`42/chat,["join",${JSON.stringify({
                        conversationId: commonChat.conversationId
                    })}]`);
                    // 
                }
                if(recv.func === 'joined'){
                    socket.send(`42/chat,["get_history", ${JSON.stringify({
                        conversationId: commonChat.conversationId,
                        limit: 1,
                    })}]`)
                }
                if(recv.func === 'show_history'){
                    socket.send(`42/chat,["send_message", ${JSON.stringify({
                        conversationId: commonChat.conversationId,
                        text: 'socket k6 load - common chat - teacher',
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
            if(recv.func == 'open_chat'){
                tmp = str.match(/{[{"',:-_a-z{}0-9-.\/A-ZА-Яа-яё %&+}]*}/gm)
                if(tmp)
                    recv.massage = JSON.parse(tmp);
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

module.exports = new WriteToCurator()