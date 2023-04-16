import { model, Schema }  from "mongoose";

const EventSchema = new Schema({
    id: Schema.Types.ObjectId,
    description: String,
    name: String,
    email: String,
    phone: String,
    address: {
      latitude: Number,
      longitude: Number,
      name : String
    },
    time: Date 
  });
  
 const EventsConn =  model('events', EventSchema);

 export default EventsConn;
