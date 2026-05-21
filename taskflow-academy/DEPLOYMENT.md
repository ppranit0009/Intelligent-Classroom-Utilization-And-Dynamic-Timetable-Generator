# TaskFlow Academy - Deployment Guide

This guide covers deploying the TaskFlow Academy full-stack application to various platforms.

## Project Architecture

- **Frontend**: React + Vite (located in `frontend/`)
- **Backend**: Node.js + Express (located in `backend/`)
- **Database**: MongoDB

## Deployment Options

### Option 1: Vercel (Frontend) + Render (Backend) + MongoDB Atlas
**Recommended for production**

#### Step 1: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier is sufficient)
4. Create a database user with username and password
5. Whitelist IP addresses (use `0.0.0.0/0` for development, specific IPs for production)
6. Get your connection string from the "Connect" button
7. Format: `mongodb+srv://<username>:<password>@cluster.mongodb.net/taskflow-academy`

#### Step 2: Deploy Backend to Render

1. Go to [Render](https://render.com)
2. Create a free account
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node src/server.js`
   - **Environment Variables**:
     ```
     PORT=5000
     NODE_ENV=production
     MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskflow-academy
     JWT_SECRET=your_secure_jwt_secret_here
     JWT_EXPIRE=30d
     FRONTEND_URL=https://your-frontend-domain.vercel.app
     ```
6. Click "Deploy Web Service"
7. Copy the deployed backend URL (e.g., `https://taskflow-backend.onrender.com`)

#### Step 3: Deploy Frontend to Vercel

1. Go to [Vercel](https://vercel.com)
2. Create a free account
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variables**:
     ```
     VITE_API_URL=https://taskflow-backend.onrender.com/api
     VITE_APP_NAME=TaskFlow Academy
     ```
6. Click "Deploy"
7. Wait for deployment to complete

#### Step 4: Update Backend CORS

After getting your Vercel frontend URL, update the Render backend environment variable:
- Set `FRONTEND_URL` to your Vercel domain (e.g., `https://taskflow-academy.vercel.app`)

---

### Option 2: Vercel (Full Stack with Serverless Functions)

#### Step 1: Set up MongoDB Atlas
(Same as Option 1, Step 1)

#### Step 2: Restructure Backend for Vercel

1. Create `api/` directory in project root
2. Move backend routes to serverless functions
3. Update API calls in frontend to use Vercel's serverless routes

#### Step 3: Deploy to Vercel

1. Push changes to GitHub
2. Import repository to Vercel
3. Configure environment variables
4. Deploy

*Note: This option requires more code restructuring. Option 1 is recommended for easier deployment.*

---

### Option 3: Netlify (Frontend) + Railway (Backend) + MongoDB Atlas

#### Step 1: Set up MongoDB Atlas
(Same as Option 1, Step 1)

#### Step 2: Deploy Backend to Railway

1. Go to [Railway](https://railway.app)
2. Create a free account
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Configure:
   - **Root Directory**: `backend`
   - **Start Command**: `node src/server.js`
6. Add environment variables in Railway dashboard
7. Deploy

#### Step 3: Deploy Frontend to Netlify

1. Go to [Netlify](https://netlify.com)
2. Create a free account
3. Click "Add new site" → "Import an existing project"
4. Connect GitHub repository
5. Configure:
   - **Build command**: `cd frontend && npm run build`
   - **Publish directory**: `frontend/dist`
6. Add environment variables
7. Deploy

---

## Environment Variables Reference

### Backend Environment Variables
```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskflow-academy
JWT_SECRET=your_secure_jwt_secret_here
JWT_EXPIRE=30d
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### Frontend Environment Variables
```
VITE_API_URL=https://your-backend-domain.onrender.com/api
VITE_APP_NAME=TaskFlow Academy
```

## Pre-Deployment Checklist

- [ ] MongoDB Atlas cluster created and connection string obtained
- [ ] Backend environment variables configured
- [ ] Frontend environment variables configured
- [ ] CORS settings updated with correct frontend URL
- [ ] JWT_SECRET set to a secure random string
- [ ] All dependencies installed (`npm install` in both frontend and backend)
- [ ] Code pushed to GitHub repository
- [ ] Repository is public or has proper deployment access

## Post-Deployment Steps

1. **Test the application**
   - Visit your frontend URL
   - Try logging in/registering
   - Test all major features

2. **Monitor backend logs**
   - Check Render/Railway dashboard for any errors
   - Monitor MongoDB Atlas for connection issues

3. **Set up custom domain** (optional)
   - Configure custom domain in Vercel/Netlify
   - Update CORS settings if needed

4. **Enable SSL** (usually automatic on these platforms)

## Troubleshooting

### Common Issues

**CORS Errors**
- Ensure `FRONTEND_URL` in backend matches your deployed frontend URL exactly
- Check that the backend allows requests from your frontend domain

**MongoDB Connection Errors**
- Verify MongoDB Atlas connection string is correct
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

**Build Failures**
- Check that all dependencies are in package.json
- Verify build commands are correct
- Check deployment logs for specific errors

**API 404 Errors**
- Ensure `VITE_API_URL` in frontend points to correct backend URL
- Check that backend is running and accessible
- Verify API routes are correctly configured

## Cost Summary

- **MongoDB Atlas**: Free tier (512MB storage)
- **Render**: Free tier (limited resources, sleeps after inactivity)
- **Vercel**: Free tier (100GB bandwidth/month)
- **Railway**: Free tier ($5 credit/month)
- **Netlify**: Free tier (100GB bandwidth/month)

**Total**: Free for development/small-scale production

## Scaling Considerations

For production with higher traffic:
- Upgrade MongoDB Atlas cluster
- Use paid Render/Railway plans for backend
- Configure CDN and caching
- Set up monitoring and logging
- Implement backup strategies
