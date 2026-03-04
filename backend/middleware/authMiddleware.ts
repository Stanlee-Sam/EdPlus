
import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'

declare namespace Express {
  interface Request {
    user?: { userId: string; role: string };
  }
}

export const authenticateToken = (req : Request, res : Response, next : NextFunction) : Response | void => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1]; // "Bearer token"

  if (!token)
    return res.status(401).json({ message: "Access denied, no token" });

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined");
    }
    const decoded = jwt.verify(token, jwtSecret);
    if(typeof decoded === 'string' || !('userId' in decoded) || !('role' in decoded)){
      return res.status(403).json({ message: "Invalid token payload" });
    }
    req.user = { userId: String(decoded.userId), role: String(decoded.role) }; // attach user info to request
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

