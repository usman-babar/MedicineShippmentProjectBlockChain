import mongoose from "mongoose";

const Connection = async () => {
  const URL = process.env.MONGODB_URL;

  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("DB connected successfully.");
    // console.log(username + " " + password);
  } catch (error) {
    console.log(`Error while connecting to the DB `, error);
    // console.log(username + " " + password);
  }
};
export default Connection;
