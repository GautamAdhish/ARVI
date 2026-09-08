require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./config/db');
const { initMemoryAdmin } = require('./utils/memoryStore');
const config = require('./config/config');

const startServer = async () => {
  const dbResult = await connectDB();

  if (dbResult.memory) {
    await initMemoryAdmin();
  }

  const PORT = config.port;

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`
🌿 ARVI Server Started
-----------------------
🚀 Environment: ${config.nodeEnv}
📡 Port: ${PORT}
🔗 API: http://localhost:${PORT}
💾 Mode: ${dbResult.memory ? 'MEMORY (no DB required)' : 'MongoDB Connected'}
📦 Frontend: ${config.clientUrl}
-----------------------
    `);
  });

  // Graceful shutdown
  process.on('unhandledRejection', (err) => {
    console.log(`❌ Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
  });
};

startServer();
