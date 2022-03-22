import express from 'express';
import axios from 'axios';

import { env } from '../constants/env';

export const editBalloonCtr = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    console.log('in server.ts editBalloonCtr controller');
    console.log(request.body);
    const res = await axios.put(`${env.Balloon_URL}/balloons/edit`, {
      ...request.body,
    });
    console.log('in server.ts editBalloon controller response data ');
    console.log(res.data);
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
export const createBalloon = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    console.log('in server.ts createBalloon controller');
    console.log(request.body);
    const res = await axios.post(`${env.Balloon_URL}/balloons/create`, {
      ...request.body,
    });
    console.log('in server.ts createBalloon controller response data ');
    console.log(res.data);
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

export const getUserBalloons = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    console.log('in server.ts getUserBalloons controller');
    console.log(request.body);
    const res = await axios.post(`${env.Balloon_URL}/balloons`, {
      ...request.body,
    });
    console.log('in server.ts balloon contorller response data ');
    console.log(res.data);
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
