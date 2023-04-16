import { model, Schema } from 'mongoose';

const mailCodeSchema = new Schema({
  email: {type: String, required: true, unique: true},
  code: {type: Number, required: true},
  date: {type: Date, required: true}
});

const MailCodeConn = model('mailCode', mailCodeSchema);

export default MailCodeConn;
