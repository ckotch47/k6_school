import { check, sleep } from 'k6';


const curatorChat = {
    index: 0,
    userId: '',
    type: 'CURATOR',
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
                    curatorChat.index = recv.massage.findIndex((val)=>val.type==='CURATOR')
                    curatorChat.userId = recv.massage[curatorChat.index].user.id;
                    curatorChat.groupId = recv.massage[curatorChat.index].group.id;
                    socket.send(`42/chat,["select_contact", ${JSON.stringify({
                        groupId: curatorChat.groupId,
                        id: null,
                        relationUserId: null,
                        type: curatorChat.type,
                        userId: curatorChat.userId
                    })}]`);
                }
                if(recv.func === 'open_chat'){
                    curatorChat.conversationId = recv.massage.conversationId;
                    socket.send(`42/chat,["join",${JSON.stringify({
                        conversationId: curatorChat.conversationId
                    })}]`);
                    // 
                }
                if(recv.func === 'joined'){
                    socket.send(`42/chat,["get_history", ${JSON.stringify({
                        conversationId: curatorChat.conversationId,
                        limit: 1,
                    })}]`)
                }
                if(recv.func === 'show_history'){
                    socket.send(`42/chat,["send_message", ${JSON.stringify({
                        conversationId: curatorChat.conversationId,
                        text: 'socket k6 load',
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
                tmp= str.slice(0,-1).match(/\[{[{"',:-_a-z{}0-9-.\/A-ZА-Яа-я %&}]*/gm)
                if(tmp){
                    recv.massage = JSON.parse(tmp[0]);
                }
            }
            if(recv.func == 'open_chat'){
                tmp = str.match(/{[{"',:-_a-z{}0-9-.\/A-ZА-Яа-я %&+}]*}/gm)
                if(tmp)
                    recv.massage = JSON.parse(tmp);
            }
            if(recv.func == 'joined'){
                tmp = str.slice(0,-1).match(/{[{"',:-_a-z{}0-9-.\/A-ZА-Яа-я %&+}]*}*/gm)
                if(tmp)
                    recv.massage = JSON.parse(tmp);
            }            
        }
        return recv;
      }
}

module.exports = new WriteToCurator()