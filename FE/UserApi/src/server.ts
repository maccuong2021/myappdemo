import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { setupSwagger } from './swagger';
import { AppDataSource } from './data-source';
import authRoutes from './routes/authRoutes';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());
setupSwagger(app);

app.use('/api', authRoutes); 
app.get('/', (req, res) => {
  res.send('User backend is running!');
});

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Connected to SQL Server");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`📄 Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  });