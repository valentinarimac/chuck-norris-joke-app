import mongoose from "mongoose";
import { MONGO_URL } from "../params";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL);
    console.log(`Database connected! ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    console.log("Connection failed!");
  }
};
