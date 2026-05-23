# E-Commerce Platform - Setup & Deployment Guide

## 🚀 Getting Started

### Prerequisites
```bash
Node.js >= 18.0.0
npm >= 9.0.0
Docker & Docker Compose
PostgreSQL 15+
MongoDB 6.0+
Redis 7+
```

### Installation

1. **Clone and Navigate**
```bash
git clone <repository-url>
cd ecommerce-platform
```

2. **Setup Environment Variables**
```bash
# Backend
cp backend/.env.template backend/.env
# Frontend
cp frontend/.env.template frontend/.env
```

3. **Configure Databases**

Edit `backend/.env`:
```env
MONGO_URI=mongodb://mongouser:mongopass@mongodb:27017/ecommerce_merchants
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=postgres
```

4. **Install Dependencies**
```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

5. **Run Locally (Without Docker)**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

Visit:
- API: http://localhost:5000
- Frontend: http://localhost:3001

---

## 🐳 Docker Deployment

### Quick Start
```bash
docker-compose up -d
```

### Access Services
- Merchant Portal: http://localhost:3001
- Shopper Portal: http://localhost:3002
- Delivery Portal: http://localhost:3003
- Admin Portal: http://localhost:3004
- Backend API: http://localhost:5000
- MongoDB: localhost:27017
- PostgreSQL: localhost:5432
- Redis: localhost:6379

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f backend
docker-compose logs -f merchant_frontend
```

---

## 📊 Database Setup

### MongoDB Initialization
```bash
# Enter MongoDB container
docker exec -it ecommerce_mongodb mongosh -u mongouser -p mongopass

# Create collections
db.createCollection("merchants")
db.createCollection("stores")
db.createCollection("products")
```

### PostgreSQL Initialization
```bash
# Enter PostgreSQL container
docker exec -it ecommerce_postgresql psql -U postgres

# Run schema files
\i /docker-entrypoint-initdb.d/shoppers_schema.sql
\i /docker-entrypoint-initdb.d/delivery_schema.sql
\i /docker-entrypoint-initdb.d/admin_schema.sql
\i /docker-entrypoint-initdb.d/shared_schema.sql
```

### Seed Data
```bash
# Inside backend container
npm run seed
```

---

## 🔐 Security Checklist

- [ ] Change all default passwords
- [ ] Set strong JWT secrets
- [ ] Enable HTTPS/SSL
- [ ] Configure rate limiting
- [ ] Setup CORS properly
- [ ] Enable database encryption
- [ ] Setup backups
- [ ] Configure firewall rules
- [ ] Enable audit logging
- [ ] Setup monitoring/alerts

---

## 📱 Portal URLs (Production)

- Merchant: https://merchant.yourdomain.com
- Shopper: https://shopper.yourdomain.com
- Delivery: https://delivery.yourdomain.com
- Admin: https://admin.yourdomain.com
- API: https://api.yourdomain.com

---

## 🚨 Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :5000
# Kill process
kill -9 <PID>
```

### Database Connection Issues
```bash
# Check MongoDB
docker logs ecommerce_mongodb

# Check PostgreSQL
docker logs ecommerce_postgresql

# Check Redis
docker logs ecommerce_redis
```

### Frontend Not Loading
```bash
# Clear Next.js cache
rm -rf frontend/.next

# Rebuild frontend
cd frontend && npm run build
```

---

## 📈 Performance Optimization

### Enable Caching
- Redis caching for frequently accessed data
- Browser caching for static assets
- CDN for images and media

### Database Optimization
- Add appropriate indexes
- Enable query caching
- Archive old data

### Frontend Optimization
- Code splitting
- Image optimization
- Lazy loading

---

## 📊 Monitoring & Logging

### Application Health
```bash
curl http://localhost:5000/health
```

### View Logs
```bash
# Backend logs
docker logs ecommerce_backend -f

# Frontend logs
docker logs ecommerce_merchant_frontend -f
```

### Enable Debug Mode
```bash
LOG_LEVEL=debug npm run dev
```

---

## 🧪 Testing

### Unit Tests
```bash
cd backend
npm run test
```

### API Testing
```bash
# Using Postman or Insomnia
# Import: /docs/postman-collection.json
```

### E2E Tests (Planned)
```bash
npm run test:e2e
```

---

## 📚 API Documentation

Full API documentation available at: `/docs/API.md`

Key endpoints:
- POST /api/v1/auth/register/merchant
- POST /api/v1/auth/login
- GET /api/v1/merchant/dashboard
- GET /api/v1/shopper/products
- GET /api/v1/delivery/available-orders
- GET /api/v1/admin/dashboard

---

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

---

## 📞 Support

For issues and support:
- GitHub Issues: <link>
- Email: support@ecommerce.com
- Documentation: <link>

---

## 📄 License

MIT License - See LICENSE file

---

**Happy Coding! 🚀**
