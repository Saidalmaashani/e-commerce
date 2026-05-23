import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Load environment variables
dotenv.config();

// Import database connections
import { connectMongoDB } from './config/database.mongo.js';
import { connectPostgreSQL } from './config/database.postgres.js';
import { connectRedis } from './config/database.redis.js';

// Import middleware
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/logger.js';
import { rateLimiter } from './middleware/rateLimiter.js';

// Import routes
import authRoutes from './routes/auth.js';
import merchantRoutes from './routes/merchant.js';
import shopperRoutes from './routes/shopper.js';
import deliveryRoutes from './routes/delivery.js';
import adminRoutes from './routes/admin.js';
import commonRoutes from './routes/common.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [
      process.env.MERCHANT_FRONTEND_URL,
      process.env.SHOPPER_FRONTEND_URL,
      process.env.DELIVERY_FRONTEND_URL,
      process.env.ADMIN_FRONTEND_URL,
    ],
    credentials: true,
  },
});

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: [
    process.env.MERCHANT_FRONTEND_URL,
    process.env.SHOPPER_FRONTEND_URL,
    process.env.DELIVERY_FRONTEND_URL,
    process.env.ADMIN_FRONTEND_URL,
  ],
  credentials: true,
}));
app.use(morgan('combined'));
app.use(requestLogger);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/api/v1', rateLimiter);

// Socket.io middleware
io.use((socket, next) => {
  // Authentication middleware for socket
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/merchant', merchantRoutes);
app.use('/api/v1/shopper', shopperRoutes);
app.use('/api/v1/delivery', deliveryRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/common', commonRoutes);

// Socket.io events
io.on('connection', (socket) => {
  console.log('New socket connection:', socket.id);

  // Delivery tracking
  socket.on('join-order-tracking', (orderId) => {
    socket.join(`order-${orderId}`);
  });

  socket.on('update-delivery-location', (data) => {
    io.to(`order-${data.orderId}`).emit('delivery-location-updated', data);
  });

  // Merchant notifications
  socket.on('join-merchant-notifications', (merchantId) => {
    socket.join(`merchant-${merchantId}`);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

// Export io for use in controllers/services
export { io };

// Error handling middleware (must be last)
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
async function startServer() {
  try {
    // Connect to databases
    console.log('Connecting to databases...');
    await connectMongoDB();
    console.log('✓ MongoDB connected');

    await connectPostgreSQL();
    console.log('✓ PostgreSQL connected');

    await connectRedis();
    console.log('✓ Redis connected');

    const PORT = process.env.PORT || 5000;
    httpServer.listen(PORT, () => {
      console.log(`\n🚀 Server running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV}`);
      console.log(`🔗 URL: ${process.env.SERVER_URL}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
