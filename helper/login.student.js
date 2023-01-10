const axios = require('axios').default;
const setting = require('../common/settings')
const fs = require("fs");

async function loginStudent(){
    let token;
    let userArr = [];
    try {
        fs.unlinkSync('../common/user.json');
    }catch {}

    for(let i=0; i<setting.loginUsersCount; i++){ // количество пользователей для входа на сайт
        token = (await axios.post(`${setting.httpConnect}/api/auth`, {
            login: `fakeUser${i + 1}@fake.ts`,
            password: 'qwer1234'
        })).data.accessToken;
        console.log(token);
        if(token){
            userArr.push({token : token})
        }
    }

    fs.appendFileSync('../common/user.json', JSON.stringify({users: userArr}) );
}

loginStudent().then( r => console.log())