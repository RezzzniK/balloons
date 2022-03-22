import { Request, Response } from 'express';
import axios from 'axios';

import { env } from '../constants/env';

// import http from './http';
// import ports from './constants';
// axios.create({
//   baseURL: 'http://localhost:',
// });
export const logInUser = async (request: Request, response: Response) => {
  try {
    // const data = request.body;
    // const path = '/login';

    // const result = await http.post(`${ports.users}${path}`);
    const res = await axios.post(`${env.User_URL}/login`, {
      ...request.body,
    });

    response.status(200).json({
      message: 'complete',
      body: res.data,
    });
  } catch (error: any) {
    response.status(500).json({
      message: 'error occured',
    });
  }
};
