import express from "express";
import { connectDB } from "./config/db";

const port = 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

/* eslint-disable @typescript-eslint/no-var-requires */
app.use("/api/users/", require("./routes/userRoutes"));
app.use("/api/joke/", require("./routes/jokeRoute"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
