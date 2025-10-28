// routes/productRoutes.js
import express from "express";
import Product from "../models/Product.js";
import FeaturedProduct from "../models/featuredProducts.js";

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const { type, subType  } = req.query;
    let filter = {};
    if (type) filter.type = type.toLowerCase();
    if (subType) filter.subType = subType.toLowerCase();

    const products = await Product.find(filter);
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

// Get all products marked as 'special'
router.get("/specials", async (req, res) => {
  try {
    const specials = await Product.find({ special: true });
    res.json(specials);
  } catch (error) {
    console.error("Error fetching special products:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET all featured products
router.get("/featured", async (req, res) => {
  try {
    const types = await FeaturedProduct.distinct("type");
    const uniqueLowercaseTypes = [...new Set(types.map(type => type.toLowerCase()))];
    res.status(200).json(uniqueLowercaseTypes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching featured products" });
  }
});

// Get all products with subTypes
router.get("/types/sub-types", async (req, res) => {
  try {
    const subTypes = await Product.distinct("subType", { subType: { $ne: "" } });

    const uniqueLowerSubTypes = [...new Set(subTypes.map((type) => type.toLowerCase()))];

    res.set('X-Total-Count', uniqueLowerSubTypes.length);
    res.json(uniqueLowerSubTypes);
  } catch (error) {
    console.error("Error fetching product types:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get all brands 
router.get("/brands", async (req, res) => {
  try {
    const brands = await Product.distinct("brand", { brand: { $ne: "" } });

    const uniqueBrands = [...new Set(brands.map((brand) => brand.toLowerCase()))];

    res.set('X-Total-Count', uniqueBrands.length);
    res.json(uniqueBrands);
  } catch (error) {
    console.error("Error fetching product types:", error);
    res.status(500).json({ message: "Server Error" });
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
