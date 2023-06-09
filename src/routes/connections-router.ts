import { Router } from 'express';
import {
  addConnection,
  getConnectionsByParent


} from '../DAL/controllers/connections';

const connectionsRouter = Router();

connectionsRouter.post('/newConnection', addConnection)

connectionsRouter.post('/getConnectionsByParent', getConnectionsByParent)

export default connectionsRouter;
