import { config } from 'dotenv';
import { resHandler } from '.';
import ConnectionsConn from '../models/connections';
import UsersConn from '../models/users';
config();


export const addConnection = async (req, res) => {
  const date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' });
  UsersConn.findOne({_id : req.body.babysitterId}, (err, babysitter) => {
    !err ? ConnectionsConn.findOneAndUpdate(
      {"parentId": req.body.parentId},
        {
          
          "babysitter": babysitter,
          "date": new Date(date)
        },
        { new: true, upsert: true },
        (err, doc) => {
          resHandler(err, doc, res, 'There is been an error creating the connection');
        }
      ) : resHandler(err, babysitter, res, 'There is been an error creating the connection');
  })
  
};

export const getConnectionsByParent = (req, res) => {
  ConnectionsConn.findOne({ parentId: req.body.parentId },  (err, doc) => {
    err
      ? (() => {
          res.send('There has been a problem finding a connection');
        })()
      : (() => {
          (() => {
            if(isMoreThan1Minut(doc.date)){
              ConnectionsConn.findOneAndDelete({ parentId: req.body.parentId }, (err, doc) => resHandler(err, doc, res, 'There has been a problem finding a connection'));
            }
            else res.send();
          })();
        })();
  })
  
};

const isMoreThan1Minut = date => {
  const diffTime = Math.abs(new Date().getTime() - date.getTime());

  return diffTime / 60000 > 0.1;
};
