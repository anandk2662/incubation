import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/incubation";

let connectionPromise;

export async function connectDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(mongoUri)
      .then(() => mongoose.connection)
      .then(console.log("db connected successfully!!"))
      .catch((error) => {
        connectionPromise = undefined;
        throw error;
      });
  }

  return connectionPromise;
}

export async function closeDatabase() {
  connectionPromise = undefined;
  await mongoose.disconnect();
}
