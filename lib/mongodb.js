import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Increase timeout to 5 seconds
    });
    console.log("MongoDB connected.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
