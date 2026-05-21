# Vercel Deployment Guide

## Project Structure
This is a full-stack application with:
- **Frontend**: React + Vite (in `frontend/` directory)
- **Backend**: Express + MongoDB (in `backend/` directory)

## Deployment Strategy

### Frontend Deployment (Vercel)
The frontend is configured for Vercel deployment as a static site.

#### Steps to Deploy Frontend:
1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from the taskflow-academy directory**:
   ```bash
   cd taskflow-academy
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy? → **Yes**
   - Which scope? → Select your account
   - Link to existing project? → **No** (create new)
   - Project name → Enter your preferred name
   - Directory → `./` (current directory)
   - Override settings? → **No** (use existing vercel.json)

5. **Set Environment Variables** in Vercel Dashboard:
   - Go to your project in Vercel Dashboard
   - Navigate to Settings → Environment Variables
   - Add: `VITE_API_URL` = Your backend URL (e.g., https://your-backend.onrender.com)
   - Add: `VITE_APP_NAME` = TaskFlow Academy

6. **Redeploy** after setting environment variables:
   ```bash
   vercel --prod
   ```

### Backend Deployment (Recommended Platforms)
Since the backend uses Express + MongoDB, it's best deployed on platforms that support long-running Node.js processes:

#### Option 1: Render (Recommended)
1. Create a Render account at [render.com](https://render.com)
2. Create a new **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Root Directory**: `taskflow-academy/backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node src/server.js`
5. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `NODE_ENV`: production
   - `PORT`: 5000
   - `FRONTEND_URL`: Your Vercel frontend URL
6. Deploy!

#### Option 2: Railway
1. Create a Railway account at [railway.app](https://railway.app)
2. Create a new project
3. Deploy from GitHub
4. Select `taskflow-academy/backend` directory
5. Add MongoDB database (Railway has built-in MongoDB)
6. Configure environment variables
7. Deploy!

#### Option 3: Heroku
1. Create a Heroku account at [heroku.com](https://heroku.com)
2. Install Heroku CLI
3. Login: `heroku login`
4. Create app: `heroku create your-app-name`
5. Deploy:
   ```bash
   cd taskflow-academy/backend
   heroku buildpacks:set heroku/nodejs
   git push heroku main
   ```
6. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI=your-mongodb-uri
   heroku config:set JWT_SECRET=your-jwt-secret
   heroku config:set NODE_ENV=production
   heroku config:set FRONTEND_URL=your-vercel-url
   ```

## Important Notes

### MongoDB Setup
You'll need a MongoDB database. Options:
- **MongoDB Atlas** (Free tier available): [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- **Render MongoDB**: Built-in MongoDB on Render
- **Railway MongoDB**: Built-in MongoDB on Railway

### Environment Variables
Make sure to set these in both deployments:

**Frontend (Vercel)**:
- `VITE_API_URL`: Your deployed backend URL
- `VITE_APP_NAME`: TaskFlow Academy

**Backend (Render/Railway/Heroku)**:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT tokens
- `NODE_ENV`: production
- `PORT`: 5000 (or your preferred port)
- `FRONTEND_URL`: Your Vercel frontend URL

### CORS Configuration
Ensure your backend CORS configuration allows requests from your Vercel frontend URL. Update in `backend/src/server.js`:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

## Testing the Deployment
1. Deploy both frontend and backend
2. Update frontend environment variable with backend URL
3. Access your Vercel frontend URL
4. Test the application functionality

## Troubleshooting
- **Frontend build fails**: Check that all dependencies are installed in `frontend/package.json`
- **Backend connection fails**: Verify MongoDB URI and network accessibility
- **CORS errors**: Ensure FRONTEND_URL is correctly set in backend environment variables
- **API calls failing**: Check that VITE_API_URL in frontend matches backend URL

## Current Configuration
The `vercel.json` file is configured to:
- Build the frontend using Vite
- Output to `frontend/dist`
- Handle client-side routing with rewrites
- Deploy as a static site

For a complete full-stack deployment on Vercel alone, significant restructuring would be needed to convert the Express backend to Vercel serverless functions. The recommended approach above separates concerns for better performance and maintainability.
