import mongoose from 'mongoose';

const mongoURI = "mongodb://localhost:27017/inotebook";

const connectToMongo = () => {
    try {
        mongoose.connect(mongoURI);
        console.log("Connected to the Mongoose Successfully.");
    } catch (err) {
        console.error("Failed to connect to MongooDB : ", err);
    }
}

export default connectToMongo;