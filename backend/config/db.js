
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URL = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URL)
    console.log("DB Connected")
  } catch (error) {
    console.log(error);

  }
}

export default connectDB;