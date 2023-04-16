import { model, Schema }  from "mongoose";

const MeetingSchema = new Schema({
  id: Schema.Types.ObjectId,
  parentId: String,
  babysitterId: String,
  address: {
    latitude: Number,
    longitude: Number,
    name : String
  },
  time: Date
});

const MettingConn =  model('meetings', MeetingSchema);

export default MettingConn;
