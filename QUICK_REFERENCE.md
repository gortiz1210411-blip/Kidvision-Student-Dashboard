# Quick Reference Card

## 🚀 Getting Started (5 Minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
Copy `.env.example` to `.env.local` and fill in your Supabase keys:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_key_here
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open in Browser
Visit: http://localhost:3000

---

## 📝 Common Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server on http://localhost:3000 |
| `npm run build` | Create production build |
| `npm run lint` | Check code quality (should show 0 errors) |
| `npm run format` | Format code with Prettier |
| `npm start` | Run production build locally |

---

## 📂 Important Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Landing page (what users see at `/`) |
| `app/components/Sidebar.tsx` | Navigation sidebar |
| `app/teacher/layout.tsx` | Dashboard layout wrapper |
| `app/teacher/dashboard/assessments/math/upload/page.tsx` | Upload assessments |
| `utils/validators.ts` | Zod validation schemas |
| `utils/supabaseServer.ts` | Server-side database client |
| `.env.example` | Environment variable template |
| `DEPLOYMENT.md` | How to deploy to production |

---

## 🔗 Key Routes

| Path | Purpose | What You See |
|------|---------|--------------|
| `/` | Home/Landing | Feature cards, quick start guide |
| `/teacher/dashboard` | Main dashboard | Overview, navigation sidebar |
| `/teacher/dashboard/assessments` | Assessment hub | Links to Math, Reading, Science |
| `/teacher/dashboard/assessments/math` | Math assessments | Table of all math assessments |
| `/teacher/dashboard/assessments/math/upload` | Upload page | Form to upload CSV files |
| `/teacher/dashboard/student` | Student roster | List of all students |
| `/teacher/dashboard/student/[id]` | Student profile | Student details and history |

---

## 📤 Uploading Data

### CSV Format (Math Assessments)

```csv
kidvision_id,scale_score,level,date_given
12345,750,A,2024-01-15
12346,680,B+,2024-01-15
12347,820,A+,2024-01-15
```

### Required Columns by Type

**FAST Math**: kidvision_id, scale_score, level, date_given
**STAR Math**: kidvision_id, scale_score, percentile_rank, level, test_name, date_given
**Unit Tests**: kidvision_id, score, test_name, date_given
**Quizzes**: kidvision_id, score, test_name, date_given
**Roster**: first_name, last_name, class_code, student_pin, kidvision_id

---

## 🚀 Deploying to Production

### Vercel (Recommended - Easiest)

1. Push code to GitHub
2. Visit https://vercel.com
3. Click "New Project" and select your repository
4. Set environment variables (same as .env.local)
5. Click "Deploy"
6. Done! Your app is live

**Time**: 2-3 minutes
**Cost**: Free tier available

### Other Options

- **Railway**: `railway up` command (3-5 minutes)
- **Netlify**: Connect GitHub repo (5-10 minutes)
- **AWS Amplify**: Console setup (10-15 minutes)
- **Digital Ocean**: App Platform (10-15 minutes)

See `DEPLOYMENT.md` for detailed steps for each platform.

---

## 🔧 Troubleshooting

### Problem: "Cannot find module"
**Solution**: 
```bash
npm install
npm run build
```

### Problem: White page / no data showing
**Solution**: Check browser console for errors. Verify `.env.local` has correct keys.

### Problem: Upload fails with "Unauthorized"
**Solution**: Check `SUPABASE_SERVICE_KEY` is correct in `.env.local`

### Problem: Lint errors
**Solution**: 
```bash
npm run format    # Auto-fix formatting
npm run lint      # Check what's left
```

### Problem: Build fails
**Solution**:
```bash
rm -rf .next node_modules
npm install
npm run build
```

---

## 📊 Database Structure

### Tables in Supabase

**students**
- id (primary key)
- first_name, last_name
- class_code, student_pin
- kidvision_id

**student_assessments**
- id (primary key)
- student_id (foreign key)
- assessment_type (FAST, STAR, Unit, Quiz)
- subject (math, reading, science)
- scale_score, percentile_rank, level
- test_name, date_given

---

## 🎯 Architecture Overview

```
Landing Page (/)
    ↓ [Go to Dashboard]
Teacher Dashboard (/teacher/dashboard)
    ├── Sidebar Navigation (fixed left)
    ├── Assessments
    │   ├── Math
    │   │   └── Upload Page
    │   ├── Reading
    │   └── Science
    └── Students
        ├── Roster
        └── Individual Profiles
```

---

## 👥 Support & Documentation

| Resource | Link |
|----------|------|
| README.md | Project overview & setup |
| USAGE.md | Quick start guide |
| DEPLOYMENT.md | 5 deployment options |
| PROJECT_COMPLETE.md | Project summary |
| UI_OVERVIEW.md | User interface guide |
| VERIFICATION_CHECKLIST.md | Complete feature list |

---

## 🔐 Security Notes

✅ **Good Security Practices**
- Service role key only used on backend (server routes)
- Anon key used for public queries (frontend)
- CSV validation prevents bad data
- TypeScript prevents type errors
- Environment variables in `.env.local` (not committed)

⚠️ **Production Checklist**
- Verify all environment variables are set on production platform
- Enable Supabase Row Level Security (RLS) policies
- Set up database backups
- Monitor API usage and costs
- Keep dependencies updated

---

## 📈 Performance Tips

1. **Optimize Database Queries**
   - Add indexes on frequently queried columns
   - Use pagination for large result sets

2. **Reduce Bundle Size**
   - Keep components modular
   - Lazy load heavy components

3. **Monitor Performance**
   - Check Vercel Analytics dashboard
   - Monitor database usage in Supabase

4. **Cache Results**
   - Use Next.js ISR (Incremental Static Regeneration)
   - Browser caching headers

---

## 📞 Quick Help

**Need to...**
- Upload assessments? → Go to `/teacher/dashboard/assessments/math/upload`
- View assessments? → Go to `/teacher/dashboard/assessments/math`
- Manage students? → Go to `/teacher/dashboard/student`
- Deploy app? → Read `DEPLOYMENT.md`
- Fix an error? → Check `VERIFICATION_CHECKLIST.md` troubleshooting

---

**Questions?** Check the appropriate documentation file listed above.

**Ready to deploy?** Follow the steps in `DEPLOYMENT.md`

**All set!** Your KidVision Student Dashboard is ready for production. 🎉
