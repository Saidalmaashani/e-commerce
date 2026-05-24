import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

import { connectMongoDB } from './config/database.mongo.js';
import { connectPostgreSQL } from './config/database.postgres.js';
import { connectRedis } from './config/database.redis.js';
import { errorHandler } from './middleware/errorHandler.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import authRoutes from './routes/auth.js';
import merchantRoutes from './routes/merchant.js';
import shopperRoutes from './routes/shopper.js';
import deliveryRoutes from './routes/delivery.js';
import adminRoutes from './routes/admin.js';
import commonRoutes from './routes/common.js';

const app = express();
const httpServer = createServer(app);

const allowedOrigins = [
  'http://localhost:3001',
  'http://localhost:3000',
  'https://ecommerce-frontend-y31j.onrender.com',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

app.options('*', cors());

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(compression());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/api/v1', rateLimiter);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString(), environment: process.env.NODE_ENV });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/merchant', merchantRoutes);
app.use('/api/v1/shopper', shopperRoutes);
app.use('/api/v1/delivery', deliveryRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/common', commonRoutes);

io.on('connection', (socket) => {
  console.log('New socket connection:', socket.id);
  socket.on('join-order-tracking', (orderId) => socket.join(`order-${orderId}`));
  socket.on('update-delivery-location', (data) => io.to(`order-${data.orderId}`).emit('delivery-location-updated', data));
  socket.on('join-merchant-notifications', (merchantId) => socket.join(`merchant-${merchantId}`));
  socket.on('disconnect', () => console.log('Socket disconnected:', socket.id));
});

export { io };
app.use(errorHandler);
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

async function startServer() {
  try {
    console.log('Connecting to databases...');
    await connectMongoDB();
    console.log('✓ MongoDB connected');
    await connectPostgreSQL();
    console.log('✓ PostgreSQL connected');
    await connectRedis();
    console.log('✓ Redis connected');

    const PORT = process.env.PORT || 5000;
    httpServer.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV}`);
    });

    setTimeout(async () => {
      try {
        const { createDefaultAdmin } = await import('./controllers/authController.js');
        await createDefaultAdmin();
      } catch(e) {}
    }, 3000);

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
export default app;
