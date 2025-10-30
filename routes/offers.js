import express from "express";
const router = express.Router();
import Offer from "../models/Offer.js"; // Example Mongoose model

// GET all offers
router.get("/", async (req, res) => {
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new offer
router.post("/", async (req, res) => {
  try {
    const newOffer = new Offer(req.body);
    await newOffer.save();
    res.status(201).json(newOffer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//PUT update event by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOffer = await Offer.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // return the updated document
    );

    if (!updatedOffer) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(updatedOffer);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE event by ID
router.delete("/:id", async (req, res) => {
  try {
    await Offer.findByIdAndDelete(req.params.id);
    res.json({ message: "Offer deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
