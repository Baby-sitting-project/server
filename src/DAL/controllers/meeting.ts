import { config } from 'dotenv';
import { resHandler } from '.';
import MeetingsConn from '../models/feedback';
config();


export const addNewMeeting = async (req, res) => {
  const date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' });
  MeetingsConn.create(
    {
      //
      time: new Date(date)
    },
    (err, doc) => {
      resHandler(err, doc, res, 'There is been an error creating the meeting');
    }
  );
};
//
// export const updateMeetingStatus = (req, res) => {
//   MeetingsConn.findOneAndUpdate({ _id: req.body.id }, { status: req.body.status }, {new: true}, (err, doc) =>
//     resHandler(err, doc, res, 'There is been an error updating the meeting')
//   );
// };
//
// export const deleteMeetingStatus = (req, res) => {
//   MeetingsConn.findOneAndDelete({ _id: req.body.id }, (err, doc) =>
//     resHandler(err, doc, res, 'There is been an error deleting the meeting')
//   );
// };
//
// export const getAllMeetings = (req, res) => {
//   MeetingsConn.find({status : "ACTIVE"}, (err, doc) => resHandler(err, doc, res, 'There is been an error getting all the meeting'));
// };

export const getAllMeetingsByBabysitter = (req, res) => {
  MeetingsConn.find({ babysitterId: req.body.babysitterObjectId }, (err, doc) => resHandler(err, doc, res, 'There is been an error getting all the user meeting'));
};

export const getAllMeetingsByParent = (req, res) => {
  MeetingsConn.find({ parentId: req.body.parentObjectId }, (err, doc) => resHandler(err, doc, res, 'There is been an error getting all the user meeting'));
};
