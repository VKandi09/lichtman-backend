import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const runTest = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    const productSchema = new mongoose.Schema({ name: String }, { strict: false });
    const Product = mongoose.model("Product", productSchema, "lichtmans_specials");

    const products = await Product.find();
    console.log("Documents found:", products.length);
    products.forEach(p => console.log(p));

    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  } catch (err) {
    console.error("MongoDB error:", err);
  }
};

runTest();
