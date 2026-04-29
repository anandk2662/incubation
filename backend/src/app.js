import express from 'express';
import projectRoutes from './routes/projectRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import { corsMiddleware } from './middleware/cors.js';
import { notFoundMiddleware } from './middleware/notFound.js';
import { errorHandlerMiddleware } from './middleware/errorHandler.js';

const app = express();

app.use(express.json({ limit: '1mb' }));
app.use(corsMiddleware);

app.get('/api/health', (request, response) => {
  response.json({ ok: true });
});

app.use('/api/projects', projectRoutes);
app.use(['/api/members', '/api/team'], memberRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
