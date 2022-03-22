import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { balloonsMicroServiceRoutes } from '../balloons_server/routes/balloons.routes';
import { env } from '../balloons_server/constants/env';

console.log('welcome to the balloons micro-service-server');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/balloons', balloonsMicroServiceRoutes);

app.listen(env.PORT, '127.0.0.1', function () {
  console.log(`Balloons-Server now listening on ${env.PORT}`);
});
