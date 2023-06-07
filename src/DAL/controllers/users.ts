import { resHandler } from '.';
import UsersConn from '../models/users';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createTransport } from 'nodemailer';
import { config } from 'dotenv';
import MailCodeConn from '../models/mailCode';

config();

const maxAge = 30 * 24 * 60 * 60;
const createToken = payload => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: maxAge
  });
};

export const addNewUser = async (req, res) => {
  
  const salt =  genSaltSync();
  const hashPassword = hashSync(req.body.password, salt);
  if (!(await doesUserExist(req, res)))
  {
    UsersConn.create(
      {
        "name": req.body.name,
        "email": req.body.email,
        "phone": req.body.phoneNumber,
        "address": {
          "latitude": req.body.location.latitude,
          "longitude": req.body.location.longitude,
        },
        "password": hashPassword,
        "isBabysitter": req.body.type === 'בייביסיטר',
        "idsFavorites": [],
        "available": false,
        "currentCodeEmail" : ""},
      (err, doc) => {
        resHandler(err, {user: doc, token: createToken({id: doc.email, role: doc.password})}, res, 'There is been an error creating the user');
      }
    );
  } else {
    res.status(500).send('שם משתמש כבר רשום במערכת')
  }
};

export const findAllAvailableBabysitters = (req, res) => {
  
  UsersConn.find({ available: true }, (err, doc) =>
    resHandler(err, doc, res, 'There is been an error getting all the unAuthorized users')
  );
};

export const deleteUser = (req, res) => {
  UsersConn.findOneAndDelete(
    { _id: req.body.id },
    // () =>
    //   EventsConn.deleteMany({ donatorId: req.body.id }, (err, doc) =>
    //     resHandler(err, doc, res, 'There is been an error deleting the user and is events')
    //   ),
    (err, doc) => resHandler(err, doc, res, req.body.id)
  );
};







export const isUserRegistered = async (req, res) => {
    UsersConn.find({ email: req.body.email.toLowerCase() }, (err, doc) => {
      console.log({ isUserRegistered: doc.length !== 0 });
      
      resHandler(err, { isUserRegistered: doc.length !== 0 }, res, 'There is been an error updating the user')
    }
  );
}

const doesUserExist = async (req, res) => {
  try {
    let users = await UsersConn.find({ email: req.body.email.toLowerCase() });
    return users.length !== 0;
  } catch (e) {
    res.status(500).send('קיימת בעית תקשורת עם השרת');
    return true;
  }
}

export const updateUser = (req, res) => {  
  let user;
  let findBy;

    findBy = { _id: req.body.ObjectId }
    user = {
      name: req.body.name,
      location: req.body.location,
      phoneNumber: req.body.phoneNumber
      // and more parameter
    }

  UsersConn.findOneAndUpdate(findBy, user, { new: true }, (err, doc) =>
    resHandler(err, doc, res, 'There is been an error updating the user')
  );
};

export const updatePassword = (req, res) => {  
  let user;
  let findBy;
    const salt = genSaltSync();
    findBy = { email: req.body.email.toLowerCase() }
    user = {
      password: hashSync(req.body.password, salt)
    };

  UsersConn.findOneAndUpdate(findBy, user, { new: true }, (err, doc) =>
    resHandler(err, doc, res, 'There is been an error updating the user')
  );
};

export const sendCodeToMail = async (req, res) => {
  const max = 999999;
  const min = 100000;
  const result = Math.floor(Math.random() * (max - min) + min);

  MailCodeConn.findOneAndUpdate(
    { email: req.body.email.toLowerCase() },
    { code: result, date: new Date },
    { new: true , upsert: true},
    (err, doc) => {
      err
        ? (() => {
          console.log('There is been an error updating the user tempMailCode' + err);
          res.send('There is been an error updating the user tempMailCode');
        })()
        : (() => {
          (async () => {
            sendEmailCode(result, doc, res);
          })();

        })()
    });
};

export const changeAvailability = (req, res) => {
  UsersConn.findOneAndUpdate({ _id: req.body.ObjectId }, { available: req.body.available }, (err, doc) => {
    resHandler(err, doc, res, 'There is been an error updating the user availability')
  }
  );
};

export const checkCode = (req, res) => {
  MailCodeConn.findOne({ email: req.body.email.toLowerCase() }, (err, doc) => {    
    err
      ? (() => {
          console.log('there is been an error checking the user' + err);
          res.send('there is been an error checking the user');
        })()
      : (() => {
        console.log(doc);
        console.log(req.body);
        
        
          if (doc && doc.code.toString() === req.body.code.toString() && isLessThan30Min(doc.date)) {
              res.send({
                id: doc._id,
                token: createToken({ email: doc.email.toLowerCase() })
              })
          } else {
            res.send({ errorMessage: 'הקוד שגוי' })
          }
        })();
  });
};

const isLessThan30Min = (date) => {
  const diffTime = Math.abs(new Date().getTime() - date.getTime());

  return diffTime / 60000 < 30;
}

export const login = (req, res) => {
  UsersConn.findOne({ email: req.body.email.toLowerCase() }, (err, doc) => {
    err
      ? (ERR => {
          console.log('there is been an error checking the user' + err);
          res.send('there is been an error checking the user');
        })()
      : (() => {
          doc
            ? compareSync(req.body.password, doc.password)
                ? res.send({
                    user: doc,
                    token: createToken({ id: doc._id, email: doc.email.toLowerCase(), password: doc.password })
                  })
              : res.send(false)
            : res.send(false);
        })();
  });
};

export const loginWithToken = (req, res) => {
  const token = req.headers.authorization;
  const extractedData = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  const userId = extractedData.id;
  const password = extractedData.password;

  UsersConn.findOne({ _id: userId }, (err, doc) => {
    err
      ? (() => {
          console.log('there is been an error checking the user' + err);
          res.send('there is been an error signing with token');
        })()
      : (() => {
          doc && password === doc.password
            ? res.send({
                user: doc,
                token: createToken({ id: doc._id, email: doc.email.toLowerCase(), password: doc.password })
              })
            : res.send(false);
        })();
  });
};

const sendEmailCode = (result, mailCodeDoc, res) => {
  console.log(mailCodeDoc.email);
  var transporter = createTransport({
    service: 'gmail',
    auth: {
      user:  'babysittingappteam@gmail.com',
      pass:  'eqteyihmqprjcygw'
    }
  });

  
  var mailOptions = {
   from: 'babysittingappteam@gmail.com',
    to: mailCodeDoc.email,
    subject: 'קוד זמני - אפליקצית בייביסיטינג',
    text: `:) הי כאן בייביסיטינג 
קודך הזמני הינו: ${result}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.send(`Email was sent`);
    }
  });
};

export const sendFeedbakNotificationMail = (email) => {
  var transporter = createTransport({
    service: 'gmail',
    auth: {
      user:  'babysittingappteam@gmail.com',
      pass:  'eqteyihmqprjcygw'
    }
  });

  var mailOptions = {
    from: 'babysittingappteam@gmail.com',
    to: email,
    subject: 'הודעת מערכת - אפליקצית בייביסיטינג',
    text: `:) הי כאן בייביסיטינג 
אנו שמחים לעדכנך שהתקבלה ביקורת חדשה עודותך.
ניתן לצפות בביקורות באיזור האישי באפליקציה`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
