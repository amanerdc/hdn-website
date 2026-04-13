# HDN Integrated Farm Website - Quick Start Guide

## What's Included

Your complete website for HDN Integrated Farm with:

✅ **7 Full Pages**
- Homepage with hero, features, products, and events
- Products catalog with categories
- Pick & Pay booking system
- Events management and booking
- About page with team and values
- Blog with articles
- Contact page with inquiry form

✅ **Core Features**
- Product inventory management
- Event booking system
- Pick & Pay experience booking
- Contact form with email integration
- Blog with articles
- Responsive design for all devices
- Beautiful green/earth-tone theme

✅ **Database-Backed Data Management**
- Supabase as source of truth for farm content
- Admin dashboard with CRUD at `/admin/dashboard`
- Image uploads via ImageKit directly from admin forms

---

## First Steps

### 1. **Set Environment Variables** (10 minutes)

Create `.env.local` and set:

```bash
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
ADMIN_SESSION_SECRET=replace_with_a_long_random_secret

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id

SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
MAIL_TO=hdnintegratedfarm.ph@gmail.com
```

### 2. **Create and Seed Supabase Tables** (5 minutes)

Run [supabase/schema.sql](supabase/schema.sql) in Supabase SQL editor.

### 3. **Use Admin Dashboard for CRUD** (5 minutes)

1. Visit `/admin`
2. Login with `ADMIN_USERNAME` and `ADMIN_PASSWORD`
3. Manage farm info, products, events, activities, pick-and-pay dates, TESDA courses, and blog posts
4. Upload images from the form using ImageKit upload button

### 4. **Deploy** (2 minutes)

1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables if using email
4. Deploy!

---

## File Structure Overview

```
/lib
  site-content.ts       ← Supabase content loaders
  admin-content.ts      ← Admin CRUD logic
  admin-resources.ts    ← Admin schema/fields
  farm-data.ts          ← Fallback/seed data

/app
  page.tsx              ← Homepage
  /products
  /events
  /pick-and-pay
  /about
  /blog
  /contact
  /api/contact          ← Email API

/components
  navigation.tsx
  footer.tsx

/public
  /products             ← Product images
  /events               ← Event images
  /blog                 ← Blog images
```

---

## Common Tasks

### Add or Edit Content
Use `/admin/dashboard` and click Save.

### Delete Content
Use `/admin/dashboard`, select a record, then click Delete.

### Upload/Replace Images
Use image fields in `/admin/dashboard` and click Upload image.

---

## Customization

### Colors
Edit `/app/globals.css` to change the green/earth theme

### Text Content
Update text in page components or footer/navigation files

### Images
Replace placeholder images in `/public/` folders

### Contact Email
Set `MAIL_TO` in `.env.local`

---

## Preview & Testing

1. Click "Preview" to see your website
2. Click through all pages to verify everything works
3. Test the contact form (messages will appear in logs)
4. Check responsiveness on mobile

---

## Deployment Checklist

- [ ] Supabase schema ran successfully
- [ ] Admin login credentials set
- [ ] ImageKit variables configured
- [ ] SMTP email variables configured
- [ ] Content managed from `/admin/dashboard`
- [ ] Tested all pages work
- [ ] Tested forms work
- [ ] Ready to deploy!

---

## Need More Details?

- **Detailed Data Management:** See `/DATA_MANAGEMENT.md`
- **Full Documentation:** See `/README.md`
- **Customization Help:** Check `/lib/admin-resources.ts` and `/lib/site-content.ts`

---

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org
- Questions? Check the README and DATA_MANAGEMENT files

---

## You're All Set! 🌾

Your farm website is ready to customize and deploy. Start by loading Supabase schema and managing records through `/admin`.

Happy farming! 🌱
