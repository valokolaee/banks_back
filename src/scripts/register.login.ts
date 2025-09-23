// src/scripts/register.ts 
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

async function registerAndLogin() {
  // register
  await axios.post(`${BASE_URL}/api/auth/register`, {
    username: 'amirali1',
    email: 'amirali1@bankon.click',
    password: '12345678',
    clientType: 'individual',
  });

  console.log('? User registered');

  // login
  const loginRes = await axios.post(`${BASE_URL}/api/auth/login`, {
    email: 'username2@bankon.click',
    password: '123456',
  });

  console.log('?? Token:', loginRes.data.accessToken);
}

registerAndLogin();
