import { config } from 'dotenv';
import { resHandler } from '.';
import FeedbacksConn from '../models/feedback';
import UsersConn from '../models/users';
import { sendFeedbakNotificationMail } from './users';
config();


export const addNewFeedback = async (req, res) => {
  const date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' });
  FeedbacksConn.create(
    {
      parentId: req.body.parentId,
      babysitterId: req.body.babysitterId,
      nickName: req.body.nickName,
      comment: req.body.comment,
      stars: req.body.stars,
      time: new Date(date)
    },
    (err, doc) =>
    {
      err
        ? (() => {
            resHandler(err, doc, res, 'There is been an error creating the feedback');
          })()
        : (() => {
            sendBabysitterNotification(req.body.babysitterId);
          })();
    }
    );
    
};
//
// export const updateFeedbackStatus = (req, res) => {
//   FeedbacksConn.findOneAndUpdate({ _id: req.body.id }, { status: req.body.status }, {new: true}, (err, doc) =>
//     resHandler(err, doc, res, 'There is been an error updating the feedback')
//   );
// };
//
// export const deleteFeedback = (req, res) => {
//   FeedbacksConn.findOneAndDelete({ _id: req.body.id }, (err, doc) =>
//     resHandler(err, doc, res, 'There is been an error deleting the feedback')
//   );
// };
//

const sendBabysitterNotification = (babysitterId) => {
  UsersConn.findOne({ _id: babysitterId },  (err, doc) =>
  {
    sendFeedbakNotificationMail(doc.email)
  });
};

export const getAllFeedbacks = (req, res) => {
  FeedbacksConn.find({}, (err, doc) => resHandler(err, doc, res, 'There is been an error getting all the feedback'));
};

export const getAllFeedbacksByParent = (req, res) => {
  FeedbacksConn.find({ parentId: req.body.parentId }, (err, doc) => resHandler(err, doc, res, 'There is been an error getting all the user feedbacks'));
};

export const getAlFeedbacksByBabysitter = (req, res) => {
  FeedbacksConn.find({ babysitterId: req.body.babysitterId }, (err, doc) => resHandler(err, doc, res, 'There is been an error getting all the user feedbacks'));
};
