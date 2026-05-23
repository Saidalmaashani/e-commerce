# E-Commerce Platform - API Documentation

## Overview
This is a comprehensive multi-role e-commerce platform with four distinct user portals integrated into a single unified application.

**Version:** 1.0.0  
**API Base URL:** `http://localhost:5000/api/v1`  
**WebSocket:** `ws://localhost:5000`

---

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <JWT_TOKEN>
```

### Token Structure
- **Access Token:** Valid for 15 minutes
- **Refresh Token:** Valid for 7 days
- **Response Format:**
```json
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "role": "merchant|shopper|delivery|admin"
  }
}
```

---

## Error Responses

All endpoints follow a consistent error format:
```json
{
  "error": "Error message",
  "statusCode": 400,
  "details": []
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Server Error

---

## Endpoints by Role

### MERCHANT PORTAL ENDPOINTS

**1. Merchant Registration**
```
POST /auth/register/merchant
Content-Type: application/json

{
  "email": "merchant@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123",
  "storeName": "My Store",
  "businessName": "My Business LLC",
  "businessCategory": "Electronics",
  "businessEmail": "business@example.com",
  "phone": "+1234567890",
  "businessLicense": "url-to-license",
  "nationalId": "url-to-id",
  "bankAccountNumber": "123456789",
  "bankRoutingNumber": "101202123",
  "bankHolderName": "My Business",
  "address": "123 Business St",
  "city": "New York",
  "state": "NY",
  "postalCode": "10001",
  "country": "United States"
}

Response: 201 Created
{
  "message": "Merchant registered successfully",
  "merchant": {
    "id": "merchant-id",
    "email": "merchant@example.com",
    "status": "pending"
  }
}
```

**2. Get Dashboard**
```
GET /merchant/dashboard
Authorization: Bearer <TOKEN>

Response: 200 OK
{
  "totalRevenue": 15000,
  "totalOrders": 350,
  "averageRating": 4.8,
  "returnRate": 2.1,
  "conversionRate": 3.24,
  "stores": 2
}
```

**3. Get Orders**
```
GET /merchant/orders?status=pending&limit=10&page=1
Authorization: Bearer <TOKEN>

Query Parameters:
- status: pending, processing, shipped, delivered, cancelled, returned
- startDate: YYYY-MM-DD
- endDate: YYYY-MM-DD
- limit: number of records
- page: page number

Response: 200 OK
{
  "orders": [
    {
      "orderId": "ORD-10001",
      "customerId": "cust-123",
      "items": [...],
      "total": 150.00,
      "status": "processing",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "totalCount": 350,
  "page": 1,
  "totalPages": 35
}
```

**4. Create Product**
```
POST /merchant/products
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "name": "Wireless Headphones",
  "description": "Premium noise-cancelling headphones",
  "richDescription": "<h3>Features:</h3>...",
  "basePrice": 79.99,
  "salePrice": 59.99,
  "category": "Electronics",
  "subcategory": "Audio",
  "tags": ["wireless", "audio", "premium"],
  "sku": "WH-2024-001",
  "baseStock": 100,
  "lowStockThreshold": 10,
  "images": [
    { "url": "https://...", "order": 1 },
    { "url": "https://...", "order": 2 }
  ],
  "variants": [
    {
      "name": "Color",
      "options": [
        { "name": "Color", "value": "Black", "price": 79.99, "stock": 50 },
        { "name": "Color", "value": "White", "price": 79.99, "stock": 50 }
      ]
    }
  ],
  "seoTitle": "Best Wireless Headphones",
  "seoDescription": "Premium noise-cancelling headphones",
  "seoKeywords": ["headphones", "wireless", "audio"]
}

Response: 201 Created
{
  "productId": "prod-12345",
  "message": "Product created successfully"
}
```

---

### SHOPPER PORTAL ENDPOINTS

**1. Shopper Registration**
```
POST /auth/register/shopper
Content-Type: application/json

{
  "phone": "+1234567890",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123",
  "firstName": "John",
  "lastName": "Doe"
}

Response: 201 Created
{
  "message": "OTP sent to your phone"
}
```

**2. Get Products**
```
GET /shopper/products?category=electronics&priceMin=0&priceMax=100&rating=4&page=1&limit=20
Authorization: Bearer <TOKEN>

Query Parameters:
- category: filter by category
- priceMin/priceMax: price range
- rating: minimum rating
- distance: maximum distance (for local delivery)
- discount: minimum discount percentage
- availability: only available products
- sort: price_asc, price_desc, rating, newest, bestselling
- search: product name search

Response: 200 OK
{
  "products": [
    {
      "productId": "prod-123",
      "name": "Wireless Headphones",
      "price": 79.99,
      "rating": 4.8,
      "reviews": 234,
      "images": ["url1", "url2"],
      "store": {
        "storeId": "store-123",
        "storeName": "Tech Store",
        "rating": 4.7
      }
    }
  ],
  "totalCount": 500,
  "facets": {
    "categories": [...],
    "priceRanges": [...],
    "ratings": [...]
  }
}
```

**3. Add to Cart**
```
POST /shopper/cart
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "productId": "prod-123",
  "quantity": 2,
  "variantId": "variant-456",
  "giftWrap": false,
  "giftMessage": ""
}

Response: 201 Created
{
  "cartId": "cart-789",
  "cartItems": [...],
  "subtotal": 159.98,
  "tax": 12.00,
  "discount": 0,
  "total": 171.98
}
```

**4. Checkout**
```
POST /shopper/checkout
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "addressId": "addr-123",
  "deliveryType": "standard",
  "paymentMethod": "card",
  "giftWrap": false,
  "notes": "Please leave at door",
  "appliedCoupons": ["SAVE10"]
}

Response: 201 Created
{
  "orderId": "ORD-10001",
  "orderNumber": "2024-001-001",
  "paymentStatus": "pending",
  "paymentIntent": "pi_...",
  "clientSecret": "pi_..._secret_...",
  "total": 150.00
}
```

---

### DELIVERY PARTNER ENDPOINTS

**1. Registration**
```
POST /auth/register/delivery
Content-Type: application/json

{
  "email": "driver@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "vehicleType": "bike|car|van|truck",
  "vehicleRegistration": "AB123CD",
  "licenseNumber": "DL123456",
  "nationalId": "12345678",
  "licensePhoto": "url",
  "vehiclePhoto": "url",
  "nationalIdPhoto": "url"
}

Response: 201 Created
{
  "message": "Application submitted for approval"
}
```

**2. Get Available Orders**
```
GET /delivery/available-orders
Authorization: Bearer <TOKEN>

Response: 200 OK
{
  "orders": [
    {
      "orderId": "ORD-10001",
      "pickupLocation": { "lat": 40.7128, "lng": -74.0060 },
      "deliveryLocation": { "lat": 40.7580, "lng": -73.9855 },
      "estimatedDistance": 5.2,
      "estimatedFare": 12.50,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

**3. Accept Order**
```
POST /delivery/orders/:orderId/accept
Authorization: Bearer <TOKEN>

Response: 200 OK
{
  "message": "Order accepted",
  "order": {...},
  "route": {...},
  "eta": "12:45 PM"
}
```

**4. Update Location (Real-time)**
```
PUT /delivery/location
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "latitude": 40.7128,
  "longitude": -74.0060,
  "accuracy": 10
}

Response: 200 OK
{
  "message": "Location updated"
}
```

---

### ADMIN ENDPOINTS

**1. Dashboard**
```
GET /admin/dashboard
Authorization: Bearer <ADMIN_TOKEN>

Response: 200 OK
{
  "totalGMV": 2500000,
  "activeUsers": 48500,
  "ordersToday": 3240,
  "revenueToday": 45800,
  "platformHealth": 99.9,
  "charts": {...},
  "liveActivity": [...]
}
```

**2. Get Pending Merchants**
```
GET /admin/merchants/pending
Authorization: Bearer <ADMIN_TOKEN>

Response: 200 OK
{
  "merchants": [
    {
      "merchantId": "mer-123",
      "businessName": "Tech Store",
      "email": "merchant@example.com",
      "submittedAt": "2024-01-15T10:30:00Z",
      "documents": {...}
    }
  ]
}
```

**3. Approve Merchant**
```
POST /admin/merchants/:merchantId/approve
Authorization: Bearer <ADMIN_TOKEN>
Content-Type: application/json

{
  "tier": "standard|verified|premium"
}

Response: 200 OK
{
  "message": "Merchant approved",
  "merchant": {...}
}
```

---

## Real-Time Features (WebSocket)

### Order Tracking
```javascript
socket.emit('join-order-tracking', {
  orderId: 'ORD-10001',
  userId: 'user-id'
});

socket.on('delivery-location-updated', (data) => {
  // { orderId, latitude, longitude, eta, status }
});
```

### Merchant Notifications
```javascript
socket.emit('join-merchant-notifications', {
  merchantId: 'mer-123'
});

socket.on('new-order', (order) => {
  // { orderId, items, total, customerInfo }
});
```

---

## Rate Limiting

All endpoints are rate-limited:
- **General:** 100 requests per 15 minutes
- **Authentication:** 5 attempts per 15 minutes
- **API:** 100 requests per minute

Response Headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1234567890
```

---

## File Upload

**Image Upload Endpoint:**
```
POST /upload
Authorization: Bearer <TOKEN>
Content-Type: multipart/form-data

File Limits:
- Single file: 10MB
- Multiple files: 50MB total
- Formats: jpg, jpeg, png, gif, webp

Response: 201 Created
{
  "url": "https://cdn.example.com/image-id.jpg",
  "id": "image-id",
  "size": 2048576
}
```

---

## Pagination

All list endpoints support pagination:
```
GET /endpoint?page=1&limit=20

Response includes:
{
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "pageSize": 20,
    "totalCount": 500,
    "totalPages": 25
  }
}
```

---

## Testing

### Using cURL
```bash
# Register merchant
curl -X POST http://localhost:5000/api/v1/auth/register/merchant \
  -H "Content-Type: application/json" \
  -d '{
    "email": "merchant@example.com",
    "password": "SecurePass123",
    ...
  }'

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "merchant@example.com",
    "password": "SecurePass123"
  }'

# Get dashboard (with token)
curl -X GET http://localhost:5000/api/v1/merchant/dashboard \
  -H "Authorization: Bearer eyJhbGc..."
```

---

## Webhooks

Configure webhooks for real-time events:
- `order.created`
- `order.status_changed`
- `delivery.completed`
- `payment.succeeded`
- `payment.failed`
- `dispute.created`

---

**Last Updated:** 2024-01-15  
**Maintained by:** Development Team
