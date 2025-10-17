import mongoose from "mongoose";

const featuredSchema = new mongoose.Schema({
  type: { type: String, required: true, unique: true },
  image: { type: String, required: true }, 
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const FeaturedProduct = mongoose.model("featured_products", featuredSchema);
export default FeaturedProduct;
