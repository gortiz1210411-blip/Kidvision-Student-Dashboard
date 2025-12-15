# Deployment Guide

This guide walks you through deploying the KidVision Student Dashboard to production on various platforms.

## Pre-Deployment Checklist

Before deploying, ensure:
- [ ] All environment variables are configured (see `.env.example`)
- [ ] Database has been set up in Supabase
- [ ] `npm run lint` passes (0 errors)
- [ ] `npm run build` succeeds
- [ ] Local testing in dev server works correctly

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the creator of Next.js and provides the best integration and easiest deployment path.

#### Steps:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy to production"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Select the project folder (root of your repository)

3. **Configure Environment Variables**
   - In Vercel's project settings, go to **Settings → Environment Variables**
   - Add all variables from your `.env.local` file:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_KEY` (or `SUPABASE_SERVICE_ROLE_KEY`)
   - Save configuration

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your project
   - Your app will be live at `your-project.vercel.app`

5. **Custom Domain (Optional)**
   - In Vercel settings, go to **Domains**
   - Add your custom domain (e.g., `kidvision.example.com`)
   - Follow DNS setup instructions from your domain provider

**Advantages:**
- Zero-config deployment
- Automatic HTTPS
- GitHub integration with auto-deploy on push
- Free tier with generous limits
- Built-in analytics and monitoring

**Cost:** Free tier available; paid plans start at $20/month

---

### Option 2: Railway

Railway is a modern deployment platform with simple pricing and excellent CLI support.

#### Steps:

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Initialize Railway Project**
   ```bash
   railway init
   ```
   - Choose "Create a new project"
   - Enter project name (e.g., `kidvision-dashboard`)

4. **Add Environment Variables**
   ```bash
   railway variables set NEXT_PUBLIC_SUPABASE_URL=<your-url>
   railway variables set NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-key>
   railway variables set SUPABASE_SERVICE_KEY=<your-key>
   ```

5. **Deploy**
   ```bash
   railway up
   ```
   - Railway will build and deploy automatically
   - Your app URL will be displayed in the CLI

6. **View Deployment**
   ```bash
   railway open
   ```
   Opens your deployed app in the browser

**Advantages:**
- Simple CLI interface
- $5/month starting plan
- Good performance
- Easy environment management

**Cost:** Pay-as-you-go; $5-50/month typical for small projects

---

### Option 3: Netlify

Netlify is popular for static sites but also supports Next.js with some configuration.

#### Steps:

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Connect Your Site**
   ```bash
   netlify init
   ```
   - Choose "Create and deploy manually" or connect GitHub
   - Confirm project directory

4. **Configure for Next.js**
   - In Netlify UI, go to **Site Settings → Build & Deploy**
   - Set Build command: `npm run build`
   - Set Publish directory: `.next`

5. **Add Environment Variables**
   - Go to **Site Settings → Build & Deploy → Environment**
   - Add your environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_KEY`

6. **Deploy**
   ```bash
   netlify deploy --prod
   ```

**Advantages:**
- Good for static exports
- Free tier with custom domain
- Great dashboard and analytics

**Cost:** Free tier available; Pro plan $19/month

---

### Option 4: AWS Amplify

For AWS users or those wanting more control.

#### Steps:

1. **Connect GitHub Repository**
   - Visit https://aws.amazon.com/amplify
   - Click "Connect App"
   - Choose GitHub provider
   - Select your repository and branch

2. **Configure Build Settings**
   - Amplify auto-detects Next.js
   - Click through the setup wizard
   - Confirm build settings if they appear correct

3. **Add Environment Variables**
   - In Amplify console, go to **Environment Variables**
   - Add your Supabase credentials:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_KEY`

4. **Deploy**
   - Click "Save and Deploy"
   - Amplify builds and deploys automatically
   - Your app will be live at `[branch]-[id].amplifyapp.com`

**Advantages:**
- AWS ecosystem integration
- Good for scalable apps
- CloudFront CDN included

**Cost:** Free tier (with limits); paid plans from $0.015/hour

---

### Option 5: Digital Ocean App Platform

For developers comfortable with cloud infrastructure.

#### Steps:

1. **Create Digital Ocean Account**
   - Visit https://www.digitalocean.com
   - Create account and billing method

2. **Create New App**
   - Go to **Apps → Create App**
   - Connect GitHub repository
   - Select your repository

3. **Configure App**
   - Set environment variables in the UI
   - Configure build command: `npm ci && npm run build`
   - Configure run command: `npm start`

4. **Deploy**
   - Click "Create App"
   - Digital Ocean builds and deploys automatically

**Advantages:**
- Affordable ($5-12/month typical)
- Simple configuration
- Good documentation

**Cost:** App Platform from $5/month

---

## Post-Deployment

### 1. Verify Deployment

- Visit your deployed URL
- Test key features:
  - Load the dashboard
  - Upload assessment data
  - View student roster
  - Check all links work

### 2. Monitor Performance

- Set up error tracking (optional):
  - Vercel has built-in analytics
  - Railway has monitoring dashboard
  - Consider Sentry.io for error logging

- Monitor database usage:
  - Visit Supabase dashboard
  - Check usage statistics
  - Set up usage alerts

### 3. Set Up Custom Domain

Choose your domain registrar (GoDaddy, Namecheap, etc.) and follow your platform's DNS setup instructions.

### 4. Enable HTTPS

All listed platforms provide automatic HTTPS. If using a custom domain:
- Vercel: Automatic after DNS setup
- Railway: Automatic
- Netlify: Automatic
- AWS Amplify: Automatic
- Digital Ocean: Automatic

---

## Troubleshooting

### Build Fails with "Cannot find module"
```bash
# Clean install dependencies and rebuild locally
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Not Found
- Double-check variable names in your deployment platform
- Ensure `NEXT_PUBLIC_` prefix for client-side variables
- Restart deployment after adding variables

### "Unauthorized" Error on Data Uploads
- Verify `SUPABASE_SERVICE_KEY` is correctly set
- Check Supabase project settings for correct API keys
- Ensure database has proper RLS policies

### App is Very Slow
- Check database query performance in Supabase
- Review API response times in platform dashboard
- Consider adding database indexes for large datasets

### Database Connection Refused
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check Supabase project is not paused
- Ensure network access is allowed

---

## Maintenance

### Regular Updates

```bash
# Check for outdated packages
npm outdated

# Update packages (carefully test before deploying)
npm update

# Update major versions (requires testing)
npm install package-name@latest
```

### Database Backups

Supabase automatically backs up your database. To export data:
1. Visit Supabase dashboard
2. Go to **SQL Editor**
3. Run `SELECT * FROM table_name`
4. Export results as CSV

### Monitoring

**Weekly:**
- Check build logs for errors
- Review error tracking (if enabled)
- Monitor database usage trends

**Monthly:**
- Review performance metrics
- Update dependencies for security patches
- Test disaster recovery procedures

---

## Scaling Considerations

As your user base grows:

1. **Database**
   - Supabase automatically scales
   - Monitor query performance
   - Add indexes for frequently queried columns

2. **File Storage**
   - Implement file cleanup (delete old uploads)
   - Consider S3 for large file storage

3. **API Performance**
   - Add caching headers to static assets
   - Implement pagination for large result sets
   - Consider CDN for static files

4. **Cost Optimization**
   - Use database connection pooling
   - Archive old assessment data
   - Clean up unused files regularly

---

## Questions or Issues?

- Check Next.js documentation: https://nextjs.org/docs
- Visit Supabase docs: https://supabase.com/docs
- Check your platform's support (Vercel, Railway, etc.)
- Review GitHub Actions logs for CI/CD issues
