import { Router } from 'express';
import { addNewEvent, deleteEventStatus, updateEventStatus, getAllEvents, getAllUserEvents } from '../DAL/controllers/events';
import authenticateToken from "../utils/authMiddleware";

const eventsRouter = Router();

eventsRouter.post('/newEvent', authenticateToken, addNewEvent)

eventsRouter.post('/updateEvent',authenticateToken, updateEventStatus)

eventsRouter.post('/deleteEvent', authenticateToken, deleteEventStatus)

eventsRouter.get('/getAllEvents', getAllEvents)

eventsRouter.post('/getAllUserEvents', authenticateToken, getAllUserEvents)

export default eventsRouter;
