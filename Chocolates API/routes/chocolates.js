import express from "express";
import Chocolate from "../models/chocolates.js";
import { authenticate } from "../middlewares/authentication.js";

const router = express.Router();

// Error handler
const handleError = (err, res) => res.status(500).json({ error: err.message });

// GET all chocolates
router.get("/chocolates", (req, res) => {
  Chocolate.find()
    .then(chocolates => res.json(chocolates))
    .catch(err => handleError(err, res));
});

// GET a single chocolate by ID
router.get("/chocolates/:id", (req, res) => {
  Chocolate.findById(req.params.id)
    .then(chocolate => chocolate ? res.json(chocolate) : res.status(404).json({ message: "Chocolate not found" }))
    .catch(err => handleError(err, res));
});

// CREATE new chocolate
router.post("/chocolates", authenticate, (req, res) => {
  Chocolate.create(req.body)
    .then(newChocolate => res.status(201).json(newChocolate))
    .catch(err => res.status(400).json({ error: err.message }));
});

// UPDATE a chocolate by ID
router.put("/chocolates/:id", authenticate, (req, res) => {
  Chocolate.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedChocolate => updatedChocolate ? res.json(updatedChocolate) : res.status(404).json({ message: "Chocolate not found" }))
    .catch(err => res.status(400).json({ error: err.message }));
});

// DELETE a chocolate by ID
router.delete("/chocolates/:id", authenticate, (req, res) => {
  Chocolate.findByIdAndDelete(req.params.id)
    .then(deletedChocolate => deletedChocolate ? res.json({ message: "Chocolate deleted" }) : res.status(404).json({ message: "Chocolate not found" }))
    .catch(err => handleError(err, res));
});

let chocoRouter = router;

export default chocoRouter;