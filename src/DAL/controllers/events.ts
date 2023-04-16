import { config } from 'dotenv';
import { resHandler } from '.';
import EventsConn from '../models/events';
import UsersConn from '../models/users';
config();

export const addNewEvent = async (req, res) => {
  const date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' });
  EventsConn.create(
    {
      title: req.body.title,
      donatorId: req.body.donatorId,
      location: req.body.location,
      name: req.body.name,
      email: req.body.email.toLowerCase(),
      phoneNumber: req.body.phoneNumber,
      about: req.body.about,
      status: req.body.status,
      time: new Date(date)
    },
    (err, doc) => {
      resHandler(err, doc, res, 'There is been an error creating the event');
    }
  );
};

export const updateEventStatus = (req, res) => {
  EventsConn.findOneAndUpdate({ _id: req.body.id }, { status: req.body.status }, {new: true}, (err, doc) =>
    resHandler(err, doc, res, 'There is been an error updating the event')
  );
};

export const deleteEventStatus = (req, res) => {
  EventsConn.findOneAndDelete({ _id: req.body.id }, (err, doc) =>
    resHandler(err, doc, res, 'There is been an error deleting the event')
  );
};

export const getAllEvents = (req, res) => {
  EventsConn.find({status : "ACTIVE"}, (err, doc) => resHandler(err, doc, res, 'There is been an error getting all the event'));
};

export const getAllUserEvents = (req, res) => {
  EventsConn.find({ donatorId: req.body.DonorObjectId }, (err, doc) => resHandler(err, doc, res, 'There is been an error getting all the user events'));
};
