export function spitMessage(str){
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
      let tmp= str.slice(0,-1).match(/\[{[{"',:-_a-z{}0-9-.\/A-ZА-Яа-я %&}]*/gm)
      if(tmp){
        recv.massage = JSON.parse(tmp[0]);
      }else{
        tmp = str.match(/{[{"',:-_a-z{}0-9-.\/A-ZА-Яа-я %&}]*}/gm)
        if(tmp)
          console.log(tmp);
      }
    }
    return recv;
  }