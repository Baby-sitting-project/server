import { Router} from 'express';
import {
  authorizeUser,
  addNewUser,
  checkCode,
  updateUser,
  sendCodeToMail,
  deleteUser,
  login,
  findAllUnAuthorized,
  loginWithToken,
  isUserRegistered
} from '../DAL/controllers/users';

import authenticateToken from "../utils/authMiddleware";
import authenticateNonUserToken from '../utils/authNonUserMiddleware';
const usersRouter = Router();

usersRouter.post('/newUser', authenticateNonUserToken, addNewUser)

usersRouter.post('/doesUserExist', isUserRegistered)

usersRouter.post('/authorizeUser', authenticateToken, authorizeUser )

usersRouter.post('/deleteUser', authenticateToken, deleteUser)

usersRouter.put('/updateUser', authenticateNonUserToken, updateUser)

usersRouter.post('/login', login)

usersRouter.post('/loginWithToken', authenticateToken, loginWithToken)

usersRouter.post('/checkCode', checkCode)

usersRouter.post('/sendCodeToMail', sendCodeToMail)

usersRouter.get('/unAuthorizedUsers', authenticateToken, findAllUnAuthorized)

 
export default usersRouter;
