import express from 'express';
import bodyParser from 'body-parser';

import { logInUser, creatUser } from '../controllers/server.users.controller';

const app = express.Router();
app.use(bodyParser.json()); //check if working without
app.post('/login', logInUser);
app.post('/create', creatUser);
export { app as userRoutes };
