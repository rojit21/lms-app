# LMS App Deployment Guide

## 🚀 Deploy to Vercel

### Step 1: Prepare Your Environment Variables

Create a `.env.local` file in the `lms-app` folder with:

```env
# MongoDB Connection (Use MongoDB Atlas for production)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lms-app

# NextAuth Configuration
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production
NEXTAUTH_URL=https://your-app-name.vercel.app

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=doxs9pupk
CLOUDINARY_API_KEY=599959164521183
CLOUDINARY_API_SECRET=LNSdyBYsBem63zbAwRa4mHGnsjY
CLOUDINARY_URL=cloudinary://599959164521183:LNSdyBYsBem63zbAwRa4mHGnsjY@doxs9pupk
```

### Step 2: Set Up MongoDB Atlas (Recommended for Production)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster
3. Get your connection string
4. Replace the MONGODB_URI in your environment variables

### Step 3: Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Step 4: Environment Variables in Vercel

Add these in your Vercel project settings:

- `MONGODB_URI` - Your MongoDB connection string
- `NEXTAUTH_SECRET` - A random secret string
- `NEXTAUTH_URL` - Your Vercel app URL
- `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Your Cloudinary API key
- `CLOUDINARY_API_SECRET` - Your Cloudinary API secret

### Step 5: Test Your Deployment

1. Visit your deployed app
2. Try registering a new user
3. Test course creation
4. Verify image uploads work

## 🔧 Local Development

To run locally:

```bash
cd lms-app
npm install
npm run dev
```

Make sure you have a `.env.local` file with the same variables as above.

## 🐛 Common Issues

### Signup Not Working
- Check MongoDB connection
- Verify environment variables
- Check browser console for errors

### Image Upload Issues
- Verify Cloudinary credentials
- Check CORS settings
- Ensure proper file permissions

### Authentication Issues
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Ensure database connection is working 