# LitVerse Setup Guide 🚀

Welcome to **LitVerse – Beyond the Bookstore**! This guide will help you set up the complete platform with all its innovative features.

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Redis** (for caching and real-time features)
- **Git**

## 🛠️ Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/litverse-bookstore.git
cd litverse-bookstore
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install

# Return to root
cd ..
```

### 3. Environment Configuration

```bash
# Copy environment template
cp env.example .env

# Edit the .env file with your configuration
nano .env
```

**Required Environment Variables:**

```env
# Essential for development
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/litverse
JWT_SECRET=your-super-secret-jwt-key
OPENAI_API_KEY=your-openai-api-key

# For payments (optional for development)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# For media uploads (optional for development)
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### 4. Database Setup

#### MongoDB Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB locally
# macOS: brew install mongodb-community
# Ubuntu: sudo apt install mongodb
# Windows: Download from mongodb.com

# Start MongoDB
mongod

# Create database
mongo
use litverse
```

**Option B: MongoDB Atlas**
1. Create account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env`

#### Redis Setup

**Option A: Local Redis**
```bash
# Install Redis
# macOS: brew install redis
# Ubuntu: sudo apt install redis-server
# Windows: Download from redis.io

# Start Redis
redis-server
```

**Option B: Redis Cloud**
1. Create account at [Redis Cloud](https://redis.com/redis-enterprise-cloud/overview/)
2. Create a new database
3. Get your connection string
4. Update `REDIS_URL` in `.env`

### 5. API Keys Setup

#### OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com)
2. Create an account and get your API key
3. Add to `.env`: `OPENAI_API_KEY=sk-...`

#### Stripe (for payments)
1. Create account at [Stripe](https://stripe.com)
2. Get your test keys from the dashboard
3. Add to `.env`:
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

#### Cloudinary (for media)
1. Create account at [Cloudinary](https://cloudinary.com)
2. Get your credentials from the dashboard
3. Add to `.env`:
   ```env
   CLOUDINARY_CLOUD_NAME=your_name
   CLOUDINARY_API_KEY=your_key
   CLOUDINARY_API_SECRET=your_secret
   ```

### 6. Start Development Servers

```bash
# Start both frontend and backend
npm run dev

# Or start them separately:
# Backend only
npm run server

# Frontend only
npm run client
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 🎯 Testing the Setup

### 1. Health Check
Visit `http://localhost:5000/api/health` - you should see:
```json
{
  "status": "OK",
  "message": "LitVerse Server is running! 📚✨",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2. Database Connection
Check your server logs for:
```
✅ Connected to MongoDB
🔌 New client connected: [socket-id]
```

### 3. Frontend Loading
Visit `http://localhost:3000` - you should see the LitVerse homepage with all features.

## 🚀 Production Deployment

### Backend Deployment (Render)

1. **Connect your GitHub repository to Render**
2. **Create a new Web Service**
3. **Configure environment variables**
4. **Set build command**: `npm install && npm run build`
5. **Set start command**: `npm start`

### Frontend Deployment (Vercel)

1. **Connect your GitHub repository to Vercel**
2. **Set root directory**: `client`
3. **Set build command**: `npm run build`
4. **Set output directory**: `build`

### Environment Variables for Production

```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
REDIS_URL=your_production_redis_url
JWT_SECRET=your_production_jwt_secret
OPENAI_API_KEY=your_openai_api_key
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

## 🔧 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error
```bash
# Check if MongoDB is running
mongosh

# If not running, start it:
mongod
```

#### 2. Redis Connection Error
```bash
# Check if Redis is running
redis-cli ping

# If not running, start it:
redis-server
```

#### 3. Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 [PID]
```

#### 4. Node Modules Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 5. Environment Variables Not Loading
```bash
# Check if .env file exists
ls -la .env

# Verify environment variables are loaded
echo $MONGODB_URI
```

## 📚 Next Steps

### 1. Explore Features
- **AI Recommendations**: Test mood-based book suggestions
- **Virtual Bookshelf**: Experience the 3D bookshelf
- **Social Features**: Join book clubs and discussions
- **Gamification**: Earn badges and achievements

### 2. Customize the Platform
- **Branding**: Update colors, logos, and branding
- **Content**: Add your own books and categories
- **Features**: Enable/disable features via environment variables
- **Styling**: Customize the UI with Tailwind CSS

### 3. Add More Books
- **Sample Data**: Use the provided sample books
- **API Integration**: Connect to external book APIs
- **Manual Entry**: Add books through the admin interface

### 4. Advanced Configuration
- **Email Notifications**: Configure SMTP settings
- **Payment Processing**: Set up Stripe webhooks
- **Analytics**: Add Google Analytics tracking
- **Monitoring**: Set up error tracking with Sentry

## 🆘 Support

If you encounter any issues:

1. **Check the logs**: Look at server and client console output
2. **Verify environment**: Ensure all required variables are set
3. **Test connections**: Verify database and Redis connections
4. **Check dependencies**: Ensure all packages are installed
5. **Restart services**: Try restarting the development servers

## 🎉 Congratulations!

You've successfully set up **LitVerse – Beyond the Bookstore**! 

The platform includes:
- ✅ AI-powered recommendations
- ✅ 3D virtual bookshelf
- ✅ Social reading features
- ✅ Gamification system
- ✅ Mood-based discovery
- ✅ Real-time features
- ✅ Payment processing
- ✅ Immersive experiences

Start exploring and enjoy the future of reading! 📚✨ 