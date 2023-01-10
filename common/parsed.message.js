function parsedMessage(str){

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
        if(recv.func === 'show_contacts'){
            tmp = str.slice(0,-1).match(/\[{.+}]/gm)
            if(tmp){
                recv.massage = JSON.parse(tmp[0]);
            }
        }
        if(recv.func === 'open_chat'){
            tmp = str.match(/{[{"',:-_a-z{}0-9-.\/A-ZА-Яа-яё %&+}]*}/gm)
            if(tmp)
                recv.massage = JSON.parse(tmp);
        }
        if(recv.func === 'open_chat' || recv.func === 'joined'){
            tmp = str.match(/{.+}/gm)
            if(tmp)
                recv.massage = JSON.parse(tmp);
        }
    }
    return recv;
}

module.exports = parsedMessage;
