import express from 'express';

import { logInUser } from '../controller/user.controller';

console.log('in user-microservice router');
const app = express.Router();
app.post('/', logInUser);
export { app as userMicroServiceRoutes };
