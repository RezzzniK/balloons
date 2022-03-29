import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { userMicroServiceRoutes } from '../user_server/routes/user.routes';
import { env } from '../user_server/constants/env';

console.log('welcome to the user micro-service-server');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('', userMicroServiceRoutes);

app.listen(env.PORT, '127.0.0.1', function () {
  console.log(`User-Server now listening on ${env.PORT}`);
});
