Quick Usage — kidvision-student-dashboard

1. Prepare env

- Copy `.env.example` → `.env.local` and fill values:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_KEY` or `SUPABASE_SERVICE_ROLE_KEY` (server only — keep secret)

2. Install & run locally (Windows `cmd.exe` recommended):

```cmd
cd /d "C:\Users\visio\OneDrive\Desktop\kidvision-student-dashboard_BWA"
npm install
npm run dev
```

Open http://localhost:3000

3. Lint / Build checks
   Use `cmd.exe` to avoid PowerShell execution-policy issues when `npm.ps1` is blocked.

```cmd
npm run lint
npm run build
```

If you get file-lock/EPERM errors during build, remove the cache and rebuild:

```cmd
rmdir /s /q .next
npm run build
```

4. Uploading test data

- Use the teacher dashboard upload pages to upload CSV/XLSX for students and assessments:
  - `Teacher → Dashboard → Assessments → Math → Upload`
  - Roster upload: `API Upload Roster` tile in teacher dashboard
- Sample validations performed in server routes; malformed CSV rows are skipped and reported.

5. Notes for contributors

- I replaced `any` usages with safe small types and improved error handling in API routes.
- Server routes use `utils/supabaseServer.ts` — ensure your service key is set in `.env.local`.

6. Next recommendations (optional)

- Add stricter runtime validation for uploaded CSV headers (e.g. `zod`) to provide precise user errors.
- Add unit tests for upload handlers and API routes.
- Add CI steps to run `npm run lint` and `npm run build` on each PR.

If you want, I can:

- Add `zod` validations for CSV rows now, or
- Prepare a commit message and run a code formatter before you commit.
