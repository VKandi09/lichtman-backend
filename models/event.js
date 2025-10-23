import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  sponsors: { type: String, required: true },
  date: { type: Date, required: true },
  time: String,
  location: String,
  details: String,
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
