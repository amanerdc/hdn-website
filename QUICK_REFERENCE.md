# HDN Farm Website - Quick Reference

## Edit This File FIRST
📝 **`/lib/farm-data.ts`** - Contains ALL your farm data:
- Farm name, contact info, social media
- Products (6 examples provided)
- Events (4 examples provided)
- Pick & Pay dates (4 examples provided)
- Blog posts (3 examples provided)

## Key Sections in farm-data.ts

### Farm Information
```typescript
export const farmInfo = {
  name: 'Your Farm Name',
  email: 'your@email.com',
  phone: '+260 123 456 789',
  location: 'Your Location',
  // ... more fields
};
```

### Adding Products
```typescript
export const products = [
  {
    id: 1,
    name: 'Product Name',
    price: '5.99',
    availability: true,
    // ... more fields
  },
];
```

### Adding Events
```typescript
export const events = [
  {
    id: 1,
    title: 'Event Name',
    date: '2026-02-15',  // YYYY-MM-DD format
    price: '10.00',
    // ... more fields
  },
];
```

### Adding Pick & Pay Dates
```typescript
export const pickAndPayDates = [
  {
    date: '2026-02-16',
    dayOfWeek: 'Sunday',
    availableSpots: 40,
    booked: 15,
  },
];
```

### Adding Blog Posts
```typescript
export const blogPosts = [
  {
    id: 1,
    title: 'Blog Title',
    slug: 'blog-url-slug',  // No spaces, use hyphens
    date: '2026-01-15',     // YYYY-MM-DD format
    // ... more fields
  },
];
```

---

## Website Pages (URLs)

| URL | Description |
|-----|-------------|
| `/` | Homepage |
| `/products` | All products |
| `/pick-and-pay` | Book harvest sessions |
| `/events` | View & book events |
| `/about` | About farm, team, values |
| `/blog` | Blog articles |
| `/blog/article-slug` | Read article |
| `/contact` | Contact form |

---

## Common Quick Edits

### Change Farm Email
Go to `farmInfo.email` in `/lib/farm-data.ts`

### Change Farm Phone
Go to `farmInfo.phone` in `/lib/farm-data.ts`

### Add New Product
Add object to `products` array with unique `id`

### Update Product Price
Change `price: '5.99'` to new price

### Mark Product Out of Stock
Change `availability: true` to `availability: false`

### Update Event Capacity
Change `booked: 12` to new number

### Add New Pick & Pay Date
Add new object to `pickAndPayDates` array

### Write Blog Post
Add to `blogPosts` array with unique `slug`

---

## Date Format

Always use: `YYYY-MM-DD`

- `2026-01-15` = January 15, 2026
- `2026-02-28` = February 28, 2026
- `2026-12-25` = December 25, 2026

---

## Important Fields

| Field | Type | Example | Notes |
|-------|------|---------|-------|
| `id` | number | `1` | Must be unique |
| `name` | string | `'Fresh Tomatoes'` | Use quotes |
| `price` | string | `'5.99'` | Must be in quotes! |
| `date` | string | `'2026-02-15'` | YYYY-MM-DD format |
| `availability` | boolean | `true` or `false` | No quotes |
| `slug` | string | `'blog-title'` | Lowercase, hyphens only |
| `booked` | number | `12` | No quotes for numbers |

---

## Optional Email Setup

1. Sign up: https://resend.com (free)
2. Get API key
3. Add to Vercel: `RESEND_API_KEY` = your key
4. Contact forms will send emails automatically

Without email setup:
- Forms still work
- Submissions log to console
- No automatic email notifications

---

## File Structure Reference

```
/lib
  farm-data.ts          ← EDIT ALL CONTENT HERE
  
/app
  page.tsx              ← Homepage
  /products
  /events
  /pick-and-pay
  /about
  /blog
  /contact
  /api/contact          ← Email API
  layout.tsx            ← Site-wide layout
  globals.css           ← Colors & styles

/components
  navigation.tsx        ← Nav bar
  footer.tsx            ← Footer
```

---

## Common Tasks Checklists

### Before First Deploy
- [ ] Updated farm name and contact info
- [ ] Added your products
- [ ] Added your events
- [ ] Added your blog posts
- [ ] Tested homepage works
- [ ] Tested all pages load

### Weekly Updates
- [ ] Update product prices/stock
- [ ] Update event booking counts
- [ ] Add new blog posts
- [ ] Update contact information

### Monthly Maintenance
- [ ] Review and update events
- [ ] Add new products as available
- [ ] Check blog is current
- [ ] Verify all links work

---

## Troubleshooting Quick Fixes

**Changes not showing?**
- Save the file
- Hard refresh browser (Ctrl+Shift+R)

**Page not loading?**
- Check browser console for errors
- Look for missing commas in data file
- Verify all strings have quotes

**Products not displaying?**
- Check `availability: true`
- Verify unique `id` numbers
- Make sure in `products` array

**Forms not working?**
- Check browser console
- Verify form fields filled correctly
- Try different email for testing

---

## Color Customization

Edit `/app/globals.css` to change:
- Primary color (green buttons/headers)
- Secondary color (gold accents)
- Accent color (orange highlights)
- Background colors
- Text colors

---

## Need Help?

1. **Data Management:** Read `/DATA_MANAGEMENT.md`
2. **Full Setup:** Read `/README.md`
3. **Website Structure:** Read `/SITEMAP.md`
4. **Getting Started:** Read `/SETUP.md`

---

## Deploy to Vercel

1. Push to GitHub
2. Connect to Vercel
3. Add env variables if using email
4. Deploy with one click!

---

## Summary

**Most important:** Everything is in `/lib/farm-data.ts`

Edit that one file to manage:
- Farm info
- Products
- Events
- Pick & Pay dates
- Blog posts

That's it! Your website updates automatically.

Happy farming! 🌾
