import { Request, Response } from 'express';
import axios from 'axios';

import { env } from '../constants/env';

// import http from './http';
// import ports from './constants';
// axios.create({
//   baseURL: 'http://localhost:',
// });
export const creatUser = async (request: Request, response: Response) => {
  try {
    console.log('in server ts create user');
    const res = await axios.post(`${env.User_URL}/create`, {
      ...request.body,
    });

    response.status(200).json({
      message: 'complete',
      body: res.data,
    });
  } catch (error: any) {
    console.log(error);
    response.status(404).json({
      message: error.response.statusText,
    });
  }
};
export const logInUser = async (request: Request, response: Response) => {
  try {
    // const data = request.body;
    // const path = '/login';

    // const result = await http.post(`${ports.users}${path}`);
    console.log('in server ts login user');
    const res = await axios.post(`${env.User_URL}/login`, {
      ...request.body,
    });

    response.status(200).json({
      message: 'complete',
      body: res.data,
    });
  } catch (error: any) {
    console.log(error);
    response.status(error.response.status).json({
      message: error.response.statusText,
    });
  }
};
