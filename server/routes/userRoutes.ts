import express from 'express';
import bodyParser from 'body-parser';

import { logInUser } from '../controllers/server.users.controller';

const app = express.Router();
app.use(bodyParser.json()); //check if working without
app.post('/', logInUser);
export { app as userRoutes };
