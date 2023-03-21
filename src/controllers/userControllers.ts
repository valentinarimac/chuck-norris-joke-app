import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import { User } from "../models/User";
import { SECRET } from "../params";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    const registeredUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPwd,
    });

    if (registeredUser) {
      res.status(201).json({
        _id: registeredUser.id,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        email: registeredUser.email,
        token: generateToken(registeredUser._id, registeredUser.email),
      });
    }
  }
);

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const checkUser = await User.findOne({ email });

  console.log(req.body);

  if (!checkUser) {
    res.status(400);
    throw new Error("User not found!");
  }

  if (checkUser && (await bcrypt.compare(password, checkUser.password))) {
    res.status(200).json({
      _id: checkUser.id,
      firstName: checkUser.firstName,
      lastName: checkUser.lastName,
      email: checkUser.email,
      token: generateToken(checkUser._id, checkUser.email),
    });
  } else {
    res.status(400);
    throw new Error("Wrong data!");
  }
});

const generateToken = (id: object, email: string): string => {
  return jwt.sign({ id, email }, SECRET, { expiresIn: "10d" });
};
