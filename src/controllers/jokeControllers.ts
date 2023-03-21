import { Response } from "express";
import asyncHandler from "express-async-handler";
import axios, { AxiosResponse } from "axios";
import nodemailer from "nodemailer";
import { EMAIL, PWD } from "../params";
import { CustomRequest } from "../middleware/authorizeUser";

export const getJoke = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    let joke: AxiosResponse;
    try {
      joke = await axios.get("https://api.chucknorris.io/jokes/random");
      res.status(200).json({
        joke: joke.data.value,
      });
    } catch (error) {
      res.status(500);
      throw new Error("Could not get joke!");
    }
    sendEmail(req.user?.email, joke.data.value).catch(console.error);
  }
);

const sendEmail = async (email: string | undefined, joke: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PWD,
    },
  });

  await transporter.sendMail({
    from: `"Chuck Norris :)" <${EMAIL}>`,
    to: email,
    subject: "Chuck Norris joke",
    text: joke,
  });
};
