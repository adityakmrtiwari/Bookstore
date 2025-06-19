# 🚀 Deployment Guide

## Backend (Render)

1. **Create a new Web Service on Render**
2. **Set Environment Variables:**
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_refresh_secret
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-app.vercel.app
   ```
   *(Do NOT set PORT; Render manages it automatically)*

3. **Build Command:**  
   ```bash
   npm install
   ```

4. **Start Command:**  
   ```bash
   npm start
   ```

5. **Root Directory:**  
   ```
   backend
   ```

6. **After deploy, note your backend URL:**  
   Example: `https://your-backend-app.onrender.com`

---

## Frontend (Vercel)

1. **Import your repo into Vercel**
2. **Set Environment Variable:**
   ```env
   REACT_APP_API_BASE_URL=https://your-backend-app.onrender.com/api
   ```

3. **Build Command:**  
   ```bash
   npm run build
   ```

4. **Output Directory:**  
   ```
   build
   ```

5. **After deploy, note your frontend URL:**  
   Example: `https://your-frontend-app.vercel.app`

---

## Final Steps

- **Update `FRONTEND_URL` in Render backend settings** to your actual Vercel frontend URL after the first deploy.
- **Redeploy backend** if you change the frontend URL.
- **Test**: Visit `/api/health` on backend and your Vercel frontend to ensure both are working.

---

## Troubleshooting

- **CORS errors**: Double-check `FRONTEND_URL` in backend env.
- **API errors**: Make sure `REACT_APP_API_BASE_URL` is correct in Vercel env.
- **MongoDB errors**: Check your Atlas connection string and IP whitelist.

---

## Security Tips

- Never commit `.env` files to git.
- Use strong, random secrets for JWT.
- Keep your dependencies up to date.

## MongoDB Atlas Setup

1. Create a new cluster
2. Create a database user
3. Get your connection string
4. Replace `username`, `password`, and `cluster` in the connection string

## Important Notes

1. **CORS**: Update `FRONTEND_URL` in backend environment variables
2. **API URL**: Update `REACT_APP_API_BASE_URL` in frontend environment variables
3. **JWT Secret**: Use a strong, random secret key
4. **Database**: Ensure MongoDB Atlas IP whitelist includes Render's IPs

## Health Check
Your backend includes a health check endpoint: `/api/health` 