import app from './app.js';
import { closeDatabase, connectDatabase } from './config/db.js';
import { seedDatabase } from './utils/seeder.js';

const port = Number(process.env.PORT) || 5000;

async function startServer() {
  await connectDatabase();
  await seedDatabase();

  app.listen(port, () => {
    console.log(`Backend API running on http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start backend server:', error);
  process.exit(1);
});

process.on('SIGINT', async () => {
  await closeDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closeDatabase();
  process.exit(0);
});