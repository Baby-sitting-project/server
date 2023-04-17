// @ts-ignore
import { Router } from 'express';
// @ts-ignore
import authenticateToken from "../utils/authMiddleware";
import {
  addNewFeedback,
   getAlFeedbacksByBabysitter,
   getAllFeedbacksByParent


} from '../DAL/controllers/feedback';

const feedbackRouter = Router();

feedbackRouter.post('/newFeedback', authenticateToken, addNewFeedback)

// feedbackRouter.post('/updateFeedback',authenticateToken, updateFeedbackStatus)
//
// feedbackRouter.post('/deleteFeedback', authenticateToken, deleteFeedback)
//
// feedbackRouter.get('/getAllFeedback', getAllFeedbacks)

feedbackRouter.post('/feedbacksByParent', authenticateToken, getAllFeedbacksByParent)

feedbackRouter.post('/feedbacksByBabysitter', authenticateToken, getAlFeedbacksByBabysitter)

// @ts-ignore
export default feedbackRouter;
