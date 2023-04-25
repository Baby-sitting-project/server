import { model, Schema } from 'mongoose';
 
const usersSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: String,
  email: {type: String, required: true, unique: true},
  phone: String,
  address: {
    latitude: Number,
    longitude: Number,
    name : String
  },
  password: String,
  isBabysitter: Boolean,
  idsFavorites: Array,
  available: Boolean,
  token : String,
  currentCodeEmail : String
});

const UsersConn = model('users', usersSchema);

export default UsersConn;


