import { Router } from 'express';
import {
  addConnection,
  getConnectionsByParent


} from '../DAL/controllers/connections';

const connectionsRouter = Router();

connectionsRouter.post('/newConnection', addConnection)

connectionsRouter.get('/getConnectionsByParent', getConnectionsByParent)

export default connectionsRouter;
