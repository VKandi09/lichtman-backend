import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  badge: String,
  validUntil: String,
});

export default mongoose.model("Offer", offerSchema);
