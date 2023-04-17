// @ts-ignore
import { Router } from 'express';
import {

addNewMeeting,deleteMeetingStatus,getAllMeetings,getAllUserMeetings,updateMeetingStatus
} from '../DAL/controllers/meeting';
// @ts-ignore
import authenticateToken from '../utils/authMiddleware';

const meetingRouter = Router();

meetingRouter.post('/newMeeting', authenticateToken, addNewMeeting)

meetingRouter.post('/updateMeeting',authenticateToken, updateMeetingStatus)

meetingRouter.post('/deleteMeeting', authenticateToken, deleteMeetingStatus)

meetingRouter.get('/getAllMeetings', getAllMeetings)

meetingRouter.post('/getAllUserMeetings', authenticateToken, getAllUserMeetings)

// @ts-ignore
export default meetingRouter;
