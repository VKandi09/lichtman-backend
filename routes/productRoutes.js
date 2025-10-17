// routes/productRoutes.js
import express from "express";
import Product from "../models/Product.js";
import FeaturedProduct from "../models/featuredProducts.js";

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const filter = {};
    console.log("Query parameters:", req.query);
    if (req.query.type) filter.type = req.query.type;
    const products = await Product.find(filter);
    console.log("Products fetched:", products.length);
    res.set('X-Total-Count', products.length);
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// Get all unique product types
router.get("/types", async (req, res) => {
  try {
    const types = await Product.distinct("type");
    res.set('X-Total-Count', types.length);
    res.json(types);
  } catch (error) {
    console.error("Error fetching product types:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get all products with subTypes
router.get("/types/sub-types", async (req, res) => {
  try {
    const subTypes = await Product.distinct("subType", { subType: { $ne: "" } });
    res.set('X-Total-Count', subTypes.length);
    res.json(subTypes);
  } catch (error) {
    console.error("Error fetching product types:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get all products marked as 'special'
router.get("/specials", async (req, res) => {
  try {
    const specials = await Product.find({ special: true });
    console.log("Fetched special products:", specials.length);
    res.json(specials);
  } catch (error) {
    console.error("Error fetching special products:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET all featured products
router.get("/featured", async (req, res) => {
  try {
    const featuredProducts = await FeaturedProduct.find();
    res.status(200).json(featuredProducts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching featured products" });
  }
});

// GET single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new product
router.post("/", async (req, res) => {
  const { name, type, brand, special, price, quantity, stock, image, subType } = req.body;
  const newProduct = new Product({ name, type, brand, special, price, quantity, stock, image, subType });
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a product by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE a product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
