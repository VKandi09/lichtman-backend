// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  brand: { type: String, required: true },
  special: { type: Boolean, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  stock: { type: Number, required: true },
  image: { type: String, default: "" },
  subType: { type: String, default: "" },
  description: { type: String, default: "" },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema, "lichtmans_specials");
export default Product;
