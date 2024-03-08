import express from "express";
import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { authenticate, isOwner } from "../middlewares/authentication.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const router = express.Router();

// Error handler
const handleError = (err, res) => res.status(500).json({ error: err.message });

// Register
router.post("/users/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: "User registered successfully", userId: user._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Authentication failed" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Authentication failed" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: "Auth successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all users
router.get("/users", authenticate, (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => handleError(err, res));
});

// GET a single user by ID
router.get("/users/:id", authenticate, (req, res) => {
  User.findById(req.params.id)
    .then(user => user ? res.json(user) : res.status(404).json({ message: "User not found" }))
    .catch(err => handleError(err, res));
});

// CREATE a new user
router.post("/users", authenticate, (req, res) => {
  User.create(req.body)
    .then(newUser => res.status(201).json(newUser))
    .catch(err => res.status(400).json({ error: err.message }));
});

// UPDATE an existing user
router.put("/users/:id", authenticate, isOwner, (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedUser => updatedUser ? res.json(updatedUser) : res.status(404).json({ message: "User not found" }))
    .catch(err => handleError(err, res));
});

// DELETE an existing user
router.delete("/users/:id", authenticate, isOwner, (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(deletedUser => deletedUser ? res.json({ message: "User deleted" }) : res.status(404).json({ message: "User not found" }))
    .catch(err => handleError(err, res));
});

let userRouter = router;

export default userRouter;