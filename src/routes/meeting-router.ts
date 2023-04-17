// @ts-ignore
import { Router } from 'express';
import {

  addNewMeeting,
  // deleteMeetingStatus,
  // getAllMeetings,
  getAllMeetingsByBabysitter,
  getAllMeetingsByParent,
  // updateMeetingStatus
} from '../DAL/controllers/meeting';
// @ts-ignore
import authenticateToken from '../utils/authMiddleware';
import { getAlFeedbacksByBabysitter } from '../DAL/controllers/feedback';

const meetingRouter = Router();

meetingRouter.post('/newMeeting', authenticateToken, addNewMeeting)
//
// meetingRouter.post('/updateMeeting',authenticateToken, updateMeetingStatus)
//
// meetingRouter.post('/deleteMeeting', authenticateToken, deleteMeetingStatus)
//
// meetingRouter.get('/getAllMeetings', getAllMeetings)

meetingRouter.post('/meetingsByBabysitter', authenticateToken, getAllMeetingsByBabysitter)
meetingRouter.post('/meetingsByParent', authenticateToken, getAllMeetingsByParent)

// @ts-ignore
export default meetingRouter;
