import mongoose from "mongoose";

const MONGO_URI =
  "mongodb+srv://rajpadval145:rajpadval145@cluster0.7s7yzkg.mongodb.net/";

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(MONGO_URI);
    if (connection) {
      console.log("Connected to database");
    }
  } catch (error) {
    console.log(error);
  }
};

export { connectDb };
