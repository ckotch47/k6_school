export function spitMessage(str){
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