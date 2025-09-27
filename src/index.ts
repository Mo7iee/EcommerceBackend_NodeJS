import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 3001;

mongoose
  .connect("mongodb://localhost:27017/")
  .then(() => console.log("Mongo Connected!"));

app.listen(port, () => {
  console.log("Server is running");
});
