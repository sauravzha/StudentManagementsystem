---
description: how to deploy the Student Management System to Vercel
---

Follow these steps to deploy your application for free:

1. **Sign Up/Login to Vercel**:
   Go to [vercel.com](https://vercel.com) and sign up using your GitHub account.

2. **Create New Project**:
   - Click the **"Add New"** button and select **"Project"**.
   - You will see a list of your GitHub repositories. Find `StudentManagementsystem` and click **"Import"**.

3. **Configure Project**:
   - **Framework Preset**: Vercel will automatically detect **Next.js**.
   - **Build and Output Settings**: Keep the defaults.
   - **Environment Variables**: Since this is currently using mock data, you don't need any environment variables for now.

4. **Deploy**:
   - Click the **"Deploy"** button.
   - Wait about 2-3 minutes for the build to finish.

5. **Access Your App**:
   - Once finished, Vercel will give you a public URL (e.g., `student-managementsystem.vercel.app`).
   - Your app is now live! Any time you `git push` to your GitHub repo, Vercel will automatically update the live site.
