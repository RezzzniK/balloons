import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { userRoutes } from '../../routes/userRoutes';
import { balloonRoutes } from '../../routes/baloonRoutes';
import { env } from '../../constants/env';

console.log('in server.ts gateway');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/balloons', balloonRoutes);

app.listen(env.PORT, '127.0.0.1', function () {
  console.log(`Server now listening on ${env.PORT}`);
});
