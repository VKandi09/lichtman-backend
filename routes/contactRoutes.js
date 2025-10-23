import express from "express";
import Contact from "../models/contact.js";

const router = express.Router();

// GET contact details (assuming only one set of details)
router.get("/", async (req, res) => {
  try {
    const contact = await Contact.findOne();
    res.json(contact || {});
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// UPDATE or CREATE contact details (admin use)
router.post("/", async (req, res) => {
  try {
    const { phone, email, address } = req.body;

    let contact = await Contact.findOne();
    if (contact) {
      contact.phone = phone;
      contact.email = email;
      contact.address = address;
      await contact.save();
      res.json({ message: "Contact details updated", contact });
    } else {
      const newContact = new Contact({ phone, email, address });
      await newContact.save();
      res.status(201).json({ message: "Contact details added", newContact });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
