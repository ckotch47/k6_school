import { sleep } from 'k6';
const parsedMessage = require('../../common/parsed.message.js');

const curatorChat = {
    index: -1,
    userId: '',
    type: 'CURATOR',
    groupId: '',
    conversationId: ''
}
class WriteToCurator{
    close(data) {
        console.log(data);
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
            let recv = parsedMessage(data)
            if(recv.func === 'exception'){
                console.log(recv);
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
                        text: 'socket k6 load - student',
                        uploads: [],
                    })}]`)
                }
                if(recv.func === 'new_message'){
                    socket.send('close');
                }
            }
          }
    }
}

module.exports = new WriteToCurator()