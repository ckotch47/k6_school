import http from 'k6/http';

export function setup() {
    const url = 'https://preprod.dev.onlineschool-1.ru/api/auth';
  const payload ={
    login: "hamhb777@gmail.com",
    password: "a791c98f-1cd8-4199-a968-28d144df60dd",
  };

  let token = http.post(url, payload).json().accessToken;
  return { data: 's' };
}

export function teardown(data) {
  console.log(JSON.stringify(data));
}

export default function (data) {
  console.log(JSON.stringify(data));
}