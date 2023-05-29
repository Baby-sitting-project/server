import { Router} from 'express';
import {
  addNewUser,
  checkCode,
  updateUser,
  sendCodeToMail,
  deleteUser,
  login,
  loginWithToken,
  isUserRegistered, changeAvailability, findAllAvailableBabysitters, updatePassword, getBabysitterAvailability, setBabysitterAvailability
} from '../DAL/controllers/users';

import authenticateToken from "../utils/authMiddleware";
import authenticateNonUserToken from '../utils/authNonUserMiddleware';
const usersRouter = Router();

usersRouter.post('/newUser', addNewUser)

usersRouter.post('/doesUserExist', isUserRegistered)

usersRouter.post('/changeAvailability', authenticateToken, changeAvailability )

usersRouter.post('/deleteUser', deleteUser)
// usersRouter.post('/deleteUser', authenticateToken, deleteUser)

usersRouter.put('/updateUser', authenticateNonUserToken, updateUser)

usersRouter.put('/updatePassword', updatePassword)

usersRouter.post('/login', login)

usersRouter.post('/loginWithToken', authenticateToken, loginWithToken)
 
usersRouter.post('/checkCode', checkCode)

usersRouter.post('/sendCodeToMail', sendCodeToMail)

usersRouter.post('/babysitterAvailability', getBabysitterAvailability)

usersRouter.put('/setBabysitterAvailability', setBabysitterAvailability)

// usersRouter.get('/allAvailableBabysitters', authenticateToken, findAllAvailableBabysitters)
usersRouter.get('/allAvailableBabysitters',authenticateToken, findAllAvailableBabysitters)

export default usersRouter;