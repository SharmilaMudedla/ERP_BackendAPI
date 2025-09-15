import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected to Spondias ERP");
    return connection;
  } catch (error) {
    console.error(error);
  }
};
export default connectDB;
