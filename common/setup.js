import http from 'k6/http';
const settings = require('./settings.js');

export function setupStudent() {
    const url = `${settings.httpConnect}/api/auth`;
    const payload ={
      login: "hamhb777@gmail.com",
      password: "a791c98f-1cd8-4199-a968-28d144df60dd",
    };

    return  {token: http.post(url, payload).json().accessToken};
  };

export function setupCurator() {
  const url = `${settings.httpConnect}/api/auth`;
  const payload ={
    login: "curator@mail.ru",
    password: "a791c98f-1cd8-4199-a968-28d144df60dd",
  };

  return  {token: http.post(url, payload).json().accessToken};
};

export function setupTeacher(){
  const url = `${settings.httpConnect}/api/auth`;
  const payload ={
    login: "teacher@mail.ru",
    password: "qwer1234",
  };

  return  {token: http.post(url, payload).json().accessToken};
}

export function setupParent(){
  const url = `${settings.httpConnect}/api/auth`;
  const payload ={
    login: "hamster123789@yandex.ru",
    password: "qwer1234",
  };

  return  {token: http.post(url, payload).json().accessToken};
}

export function setupStudentMail(data={login, password}){
  const url = `${settings.httpConnect}/api/auth`;
  const payload ={
    login: data.login,
    password: data.password,
  };

  return  {token: http.post(url, payload).json().accessToken};
}