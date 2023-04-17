// @ts-ignore
import { Router } from 'express';
// @ts-ignore
import authenticateToken from "../utils/authMiddleware";
import {
  addNewFeedback,
  deleteFeedbackStatus,
  getAllFeedbacks,
  getAllUserFeedbacks,
  updateFeedbackStatus
} from '../DAL/controllers/feedback';

const feedbackRouter = Router();

feedbackRouter.post('/newEvent', authenticateToken, addNewFeedback)

feedbackRouter.post('/updateEvent',authenticateToken, updateFeedbackStatus)

feedbackRouter.post('/deleteEvent', authenticateToken, deleteFeedbackStatus)

feedbackRouter.get('/getAllEvents', getAllFeedbacks)

feedbackRouter.post('/getAllUserEvents', authenticateToken, getAllUserFeedbacks)

// @ts-ignore
export default feedbackRouter;
