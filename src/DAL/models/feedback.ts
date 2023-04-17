import { model, Schema }  from "mongoose";

const FeedbackSchema = new Schema({
  id: Schema.Types.ObjectId,
  parentId: String,
  babysitterId: String,
  nickName: String,
  comment: String,
  stars: Number,
  time: Date
});

const FeedbackConn =  model('feedbacks', FeedbackSchema);

export default FeedbackConn;
