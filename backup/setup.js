import http from 'k6/http';

export function setup() {
    const url = 'http://localhost:3000/api/auth';
    const payload ={
      login: "hamhb777@gmail.com",
      password: "a791c98f-1cd8-4199-a968-28d144df60dd",
    };
  
    return  {token: http.post(url, payload).json().accessToken};
  };