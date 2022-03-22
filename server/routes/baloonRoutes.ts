import express from 'express';
import bodyParser from 'body-parser';

import {
  getUserBalloons,
  createBalloon,
  editBalloonCtr,
} from '../controllers/server.balloons.controller';

console.log('in gateway baloon router');
const app = express.Router();
app.use(bodyParser.json());

app.post('/', getUserBalloons);
app.post('/create', createBalloon);
app.put('/edit', editBalloonCtr);
// app.put('/:id', editballon);

export { app as balloonRoutes };
