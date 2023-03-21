import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { SECRET } from "../params";

export interface CustomRequest extends Request {
  user?: UserPayload;
}

interface UserPayload {
  id: string;
  email: string;
}

export const verifyToken = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        req.user = jwt.verify(token, SECRET) as UserPayload;
        next();
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error("Unauthorized!");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Unauthorized - no token!");
    }
  }
);
