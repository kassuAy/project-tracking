import { connect } from "http2";
import mongoose from "mongoose";
const  connectToMongoDB=async ()=> mongoose.connect(process.env.MONGO_URI!);
export default connectToMongoDB;