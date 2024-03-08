import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

export const isOwner = (req, res, next) => {
  
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, JWT_SECRET);
  const userId = decoded.userId;
  const paramId = req.params.id;

  if (userId !== paramId) {
    return res.status(403).json({ message: "Not authorized to access this resource" });
  }
  next();
};