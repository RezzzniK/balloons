import express from 'express';
import bodyParser from 'body-parser';

import { logInUser, creatUser } from '../controller/user.controller';

console.log('in user-microservice router');
const app = express.Router();
app.use(bodyParser.json());
app.post('/login', logInUser);
app.post('/create', creatUser);
export { app as userMicroServiceRoutes };
