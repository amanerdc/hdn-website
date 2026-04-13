# HDN Integrated Farm Website

A modern, responsive website for HDN Integrated Farm featuring products, events, pick & pay bookings, and community engagement.

## Features

- 🌾 **Product Showcase** - Display and manage organic produce inventory
- 📅 **Event Management** - Book farm tours, workshops, and community events
- 🌱 **Pick & Pay** - Allow customers to book pick & pay experiences
- 📝 **Blog** - Share farming tips, recipes, and updates
- 📧 **Contact Forms** - Email integration for inquiries and bookings
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🎨 **Modern Design** - Green and earth-tone theme perfect for agricultural business

## Getting Started

### 1. Configure Environment Variables

Create a `.env.local` file with the variables below:

```bash
# Supabase
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Admin login (/admin)
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
ADMIN_SESSION_SECRET=replace_with_a_long_random_secret

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id

# Email (for forms and bookings)
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
MAIL_TO=hdnintegratedfarm.ph@gmail.com
```

### 2. Create Supabase Tables and Seed Data

Run [supabase/schema.sql](supabase/schema.sql) in your Supabase SQL editor.

### 3. Manage Content from Admin Dashboard

1. Open `/admin`
2. Sign in with `ADMIN_USERNAME` and `ADMIN_PASSWORD`
3. Manage farm info, products, events, activities, dates, TESDA courses, and blog posts
4. Upload images directly in admin forms (stored in ImageKit)

All public pages query Supabase via server-side content loaders in [lib/site-content.ts](lib/site-content.ts).

### 4. Customize Colors

Edit the theme colors in `/app/globals.css`:

```css
:root {
  --primary: oklch(0.45 0.2 130);           /* Green for primary */
  --secondary: oklch(0.75 0.15 60);         /* Yellow/Gold for secondary */
  --accent: oklch(0.65 0.18 20);            /* Orange/Red for accents */
  /* ... more color variables ... */
}
```

### 5. Update Metadata

Edit the SEO metadata in `/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'HDN Integrated Farm - Fresh Organic Produce & Farm Events',
  description: 'Your custom description here',
  // ...
};
```

## Project Structure

```
/app
  /api
    /contact         # Contact form API route
  /products          # Products page
  /events            # Events and booking page
  /pick-and-pay      # Pick & pay booking page
  /about             # About us page
  /blog
    /[slug]          # Individual blog post pages
  /contact           # Contact form page
  page.tsx           # Homepage
  layout.tsx         # Root layout
  globals.css        # Theme and styles

/components
  navigation.tsx     # Navigation bar
  footer.tsx         # Footer
  /ui                # Shadcn UI components

/lib
  site-content.ts    # Supabase-backed content queries
  farm-data.ts       # Seed/fallback data
  admin-content.ts   # Admin CRUD over Supabase
  admin-resources.ts # Admin resource definitions
  utils.ts           # Utility functions
```

## Pages

- **Home** (`/`) - Hero, featured products, upcoming events, features
- **Products** (`/products`) - Full product catalog with categories
- **Pick & Pay** (`/pick-and-pay`) - Book pick & pay experiences
- **Events** (`/events`) - View and book farm events
- **About** (`/about`) - Farm story, mission, values, team
- **Blog** (`/blog`) - Articles and updates
- **Contact** (`/contact`) - Contact form and information

## Content Management

- Update content from `/admin/dashboard` (create, edit, delete records)
- Upload media from admin image fields using ImageKit upload button
- Public pages revalidate after admin changes via server-side `revalidatePath`

## Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel project settings (if using email)
4. Deploy with one click!

## Environment Variables

Required environment variables:

```bash
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_USERNAME=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
SMTP_USER=
SMTP_PASS=
MAIL_TO=
```

## Support

To customize further or troubleshoot:

1. Check Supabase schema in [supabase/schema.sql](supabase/schema.sql)
2. Review data loaders in [lib/site-content.ts](lib/site-content.ts)
3. Review admin CRUD wiring in [lib/admin-content.ts](lib/admin-content.ts)
4. Modify CSS in [app/globals.css](app/globals.css)

## License

Built with ❤️ for HDN Integrated Farm
