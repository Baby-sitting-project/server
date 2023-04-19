import express, { json, urlencoded, Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import responseTime from 'response-time';
import compression from 'compression';
import xssClean from 'xss-clean';
import usersRouter from './routes/users-router';
import feedbackRouter from './routes/feedback-router';
import meetingRouter from './routes/meeting-router';

import mongoose, { Schema } from 'mongoose';

const app: Application = express();

app.use(compression());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(responseTime());
app.use(xssClean());
app.use(morgan('dev'));
app.use(express.static('public'));

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.removeHeader('X-Frame-Options');
  next();
});

app.use(usersRouter);
app.use(feedbackRouter);
app.use(meetingRouter);

app.set('showStackError', true);

const MONGO = process.env.MONGO;
const connectionpOptions = {
  dbName: `first`
};

export const mongoConnection = mongoose.connect(MONGO, connectionpOptions).then(res => {
  console.log("connect to mongo")
});

export default app;


