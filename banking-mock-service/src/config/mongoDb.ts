import mongoose from "mongoose";
import ENV from "./ENV.js";
mongoose.set("strictQuery", false);

// creating a connection to database
const connectDb = async (uri: string): Promise<void> => {
  if (!uri) {
  }
  return mongoose
    .connect(uri)
    .then(() => {
      console.log("Connected to Database Successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};

const databaseConnection = async () => {
  try {
    await connectDb(ENV.MONGO_URL);
  } catch (error) {
    console.log(error);
  }
};

export default databaseConnection;
