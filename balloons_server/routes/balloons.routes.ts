import express from 'express';
import bodyParser from 'body-parser';

import {
  balloonsByUser,
  createBalloon,
  editBalloonCtr,
} from '../controllers/balloons.controller';

console.log('in balloons-microservice router');
const app = express.Router();
app.use(bodyParser.json());

app.post('/', balloonsByUser);
app.post('/create', createBalloon);
app.put('/edit', editBalloonCtr);
export { app as balloonsMicroServiceRoutes };
