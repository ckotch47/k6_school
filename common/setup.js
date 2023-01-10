import http from 'k6/http';
const settings = require('./settings.js');
import { SharedArray } from 'k6/data';

const data = new SharedArray('user', function () {
    return JSON.parse(open('./user.json')).users;
});

// old api
export function setupStudent() {
    const url = `${settings.httpConnect}/api/auth`;
    const payload ={
      login: "hamhb777@gmail.com",
      password: "a791c98f-1cd8-4199-a968-28d144df60dd",
    };

    return  {token: http.post(url, payload).json().accessToken};
}

// not used
export function curatorToken() {
  return {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlmYmFlNGY3LTYyNDAtNGZhMC05YTlkLWY2NmUxMDNhOTEwMSIsImVtYWlsIjoiY3VyYXRvckBtYWlsLnJ1IiwicGxhdGZvcm1JZCI6ImY0OWZkODEyLWYyMWEtNDRiMi1hODkyLWU0YmQzMzZkNGNkNiIsImlzU3VwZXJBZG1pbiI6ZmFsc2UsImlhdCI6MTY3MzM2Nzc3OCwiZXhwIjoxNzA0OTAzNzc4fQ.8r4KNYH3i0RnGdPoFph6eZdht1LA-TCJyxYpORz9Br0'};
}


export function studentFromFile(){
  return data;
}