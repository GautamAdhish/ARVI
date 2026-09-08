const mongoose = require('mongoose');

let isConnected = false;
let memoryFallback = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.log('⚠️  MONGODB_URI not set - running in MEMORY mode (data will not persist)');
    memoryFallback = true;
    return { memory: true };
  }

  try {
    const conn = await mongoose.connect(uri, {
      autoIndex: true,
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host} / ${conn.connection.name}`);
    return { memory: false, connection: conn };
  } catch (error) {
    console.warn(`⚠️  MongoDB connection failed: ${error.message}`);
    console.log('⚠️  Falling back to MEMORY mode');
    memoryFallback = true;
    return { memory: true };
  }
};

const isMemoryMode = () => memoryFallback || !isConnected;
const getConnectionStatus = () => ({ isConnected, memoryFallback });

module.exports = { connectDB, isMemoryMode, getConnectionStatus };
