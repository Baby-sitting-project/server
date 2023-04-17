import { config } from 'dotenv';
import { resHandler } from '.';
import FeedbacksConn from '../models/feedback';
config();


export const addNewFeedback = async (req, res) => {
  const date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' });
  FeedbacksConn.create(
    {
      //
      time: new Date(date)
    },
    (err, doc) => {
      resHandler(err, doc, res, 'There is been an error creating the feedback');
    }
  );
};

export const updateFeedbackStatus = (req, res) => {
  FeedbacksConn.findOneAndUpdate({ _id: req.body.id }, { status: req.body.status }, {new: true}, (err, doc) =>
    resHandler(err, doc, res, 'There is been an error updating the feedback')
  );
};

export const deleteFeedbackStatus = (req, res) => {
  FeedbacksConn.findOneAndDelete({ _id: req.body.id }, (err, doc) =>
    resHandler(err, doc, res, 'There is been an error deleting the feedback')
  );
};

export const getAllFeedbacks = (req, res) => {
  FeedbacksConn.find({status : "ACTIVE"}, (err, doc) => resHandler(err, doc, res, 'There is been an error getting all the feedback'));
};

export const getAllUserFeedbacks = (req, res) => {
  FeedbacksConn.find({ donatorId: req.body.DonorObjectId }, (err, doc) => resHandler(err, doc, res, 'There is been an error getting all the user feedbacks'));
};
