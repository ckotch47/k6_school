const axios = require('axios').default;
const setting = require('../common/settings')
async function loginAdmin() {
    return (await axios.post(`${setting.httpConnect}/api/auth`, {
        'login': 'admin@school-1.ru',
        'password': 'a791c98f-1cd8-4199-a968-28d144df60dd'
    })).data.accessToken;
}

async function createUser(){
    const tokenAdmin = await loginAdmin();
    const header = { headers: {Authorization: `Bearer ${tokenAdmin}`} }
    let res;
    let userId;
    for(let i=0; i<setting.registerUserCount; i++){ // количество пользователей которое нужно зарегистрировать
        res = await axios.post(`${setting.httpConnect}/api/widget/create-user`,
                {
                    email: `fakeUser${i + 1}@fake.ts`,
                    firstName: `fakeUser${i + 1}`,
                    lastName: `fakeUser${i + 1}`,
                    middleName: `fakeUser${i+1}`,
                    password: 'qwer1234',
                    roleId: setting.roleId,
                    status: 'ACTIVE',
                    groupId: setting.groupId,
                    tariffId: setting.tariffId
                },
                header
            );
        if(res.data.id){
            userId = res.data.id;
            await axios.put(`${setting.httpConnect}/api/widget/profile-user/${userId}/subscription`,
                {
                    tariffId: setting.tariffId,
                    selectedOptions:[]
                },
                header
            );
        }
    }
}

createUser().then( r => console.log())