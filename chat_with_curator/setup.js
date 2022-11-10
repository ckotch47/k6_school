import http from 'k6/http';
const settings = require('../common/settings.js');

export function setup() {
    const url = `${settings.httpConnect}/api/auth`;
    const payload ={
      login: "hamhb777@gmail.com",
      password: "a791c98f-1cd8-4199-a968-28d144df60dd",
    };

    return  {token: http.post(url, payload).json().accessToken};
  };