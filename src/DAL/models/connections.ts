import { model, Schema } from 'mongoose';

const connectionsSchema = new Schema({
  id: Schema.Types.ObjectId,
  parentId: {type: String, required: true},
  babysitter: {type: JSON, required: true},
  date: {type: Date, required: true, unique: true}
});

const ConnectionsConn = model('connections', connectionsSchema);

export default ConnectionsConn;