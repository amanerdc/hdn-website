# HDN Integrated Farm Website - Sitemap

## Website Structure

```
🏠 HDN Integrated Farm Website
│
├── 🏠 HOME (/)
│   ├── Hero Section
│   ├── Why Choose HDN Farm (4 features)
│   ├── Featured Products (3 products)
│   ├── Upcoming Events (2 events)
│   └── Call to Action
│
├── 🥬 PRODUCTS (/products)
│   ├── Category Filter
│   ├── Full Product Grid
│   └── Product Details (price, stock, availability)
│
├── 🌾 PICK & PAY (/pick-and-pay)
│   ├── Experience Information (3 info cards)
│   ├── Available Dates Calendar
│   ├── Booking Form (name, email, phone, participants)
│   └── What to Expect Section
│
├── 📅 EVENTS (/events)
│   ├── Event Listings
│   ├── Event Details (date, time, capacity, price)
│   ├── Booking Form
│   └── Availability Counter
│
├── ℹ️ ABOUT (/about)
│   ├── Our Story
│   ├── Our Values (3 core values)
│   ├── Sustainable Practices (4 practices)
│   └── Team Section (3 team members)
│
├── 📝 BLOG (/blog)
│   ├── Blog Listing
│   ├── Featured Article
│   ├── Blog Post Grid
│   └── Newsletter Signup
│
├── 📄 BLOG POST (/blog/[slug])
│   ├── Article Header (title, date, author)
│   ├── Article Content
│   ├── Author Bio
│   ├── Navigation Links (previous/next posts)
│   └── Call to Action
│
└── 📧 CONTACT (/contact)
    ├── Contact Information
    │   ├── Location
    │   ├── Phone
    │   ├── Email
    │   └── Social Media Links
    ├── Contact Form
    │   ├── Name field
    │   ├── Email field
    │   ├── Phone field
    │   ├── Subject field
    │   └── Message textarea
    └── FAQ Section (4 questions)
```

---

## Page Routes & URLs

| Page | URL | Purpose |
|------|-----|---------|
| Homepage | `/` | Main landing page |
| Products | `/products` | Browse all products |
| Pick & Pay | `/pick-and-pay` | Book harvest sessions |
| Events | `/events` | View and book events |
| About | `/about` | Farm story and team |
| Blog | `/blog` | Articles and news |
| Blog Post | `/blog/benefits-organic-farming` | Individual article |
| Blog Post | `/blog/seasonal-produce-guide` | Individual article |
| Blog Post | `/blog/farm-to-table-recipes` | Individual article |
| Contact | `/contact` | Contact form & info |
| API | `/api/contact` | Contact form submission |

---

## Data Files

### Main Data File
- **Location:** `/lib/farm-data.ts`
- **Contains:**
  - `farmInfo` - Farm name, contact, location, social media
  - `products` - All product listings (6 products)
  - `events` - All events (4 events)
  - `pickAndPayDates` - Harvest session dates (4 dates)
  - `blogPosts` - Blog articles (3 posts)

### Component Files
- `/components/navigation.tsx` - Top navigation bar
- `/components/footer.tsx` - Footer with links and info

### Page Files
- `/app/page.tsx` - Homepage
- `/app/products/page.tsx` - Products page
- `/app/pick-and-pay/page.tsx` - Pick & Pay page
- `/app/events/page.tsx` - Events page
- `/app/about/page.tsx` - About page
- `/app/blog/page.tsx` - Blog listing
- `/app/blog/[slug]/page.tsx` - Individual blog post
- `/app/contact/page.tsx` - Contact page
- `/app/api/contact/route.ts` - Contact form API

### Configuration Files
- `/app/layout.tsx` - Root layout & metadata
- `/app/globals.css` - Theme colors & styles
- `/public/` - Images and static assets

---

## Product Categories

Currently available:
- **Vegetables** (Tomatoes, Lettuce, Carrots, Peppers)
- **Herbs** (Fresh Herbs Bundle)
- **Fruits** (Seasonal Fruits)

---

## Features Overview

### Navigation
- Responsive navigation bar with mobile menu
- Links to all 7 main pages
- Farm logo/branding

### Homepage
- Full-width hero section
- 4-feature highlight section
- 3 featured products carousel
- 2 upcoming events preview
- CTA section

### Products
- Product grid with image placeholders
- Category filtering
- Price, stock, and availability info
- Add to cart buttons (styled)

### Pick & Pay
- Information cards (3)
- Available dates calendar
- Booking form
- Availability tracking

### Events
- Event card listings
- Interactive booking form
- Capacity management
- Event details (date, time, price)

### About
- Farm story section
- Values/benefits cards (3)
- Sustainable practices list
- Team member profiles

### Blog
- Blog post listings
- Featured article spotlight
- Article preview cards
- Newsletter signup
- Blog post pages with navigation

### Contact
- Contact information display
- Working contact form
- Email API integration
- Social media links
- FAQ section

---

## Admin/Management Areas

(Note: This is a frontend website - no admin dashboard included)

To manage content, edit:
- `/lib/farm-data.ts` - All content
- `/app/globals.css` - Colors and styling
- Page files - Text and layout changes

---

## Forms & Integrations

### Contact Form
- **Location:** `/contact`
- **Submission:** POST to `/api/contact`
- **Fields:** Name, Email, Phone, Subject, Message
- **Integration:** Optional Resend API for emails

### Event Booking Form
- **Location:** `/events`
- **Submission:** Client-side (shows confirmation message)
- **Fields:** Name, Email, Phone, Participants, Special Requests

### Pick & Pay Booking
- **Location:** `/pick-and-pay`
- **Submission:** Client-side (shows confirmation message)
- **Fields:** Name, Email, Phone, Number of People, Special Notes

---

## Media Assets

### Product Images
- `/public/products/tomatoes.jpg`
- `/public/products/lettuce.jpg`
- `/public/products/carrots.jpg`
- `/public/products/peppers.jpg`
- `/public/products/herbs.jpg`
- `/public/products/fruits.jpg`

### Event Images
- `/public/events/tour.jpg`
- `/public/events/market.jpg`
- `/public/events/cooking.jpg`
- `/public/events/kids.jpg`

### Blog Images
- `/public/blog/organic.jpg`
- `/public/blog/seasonal.jpg`
- `/public/blog/recipes.jpg`

---

## Color Scheme

**Primary:** Green (`oklch(0.45 0.2 130)`) - Main buttons, headers
**Secondary:** Gold/Yellow (`oklch(0.75 0.15 60)`) - Accents
**Accent:** Orange/Red (`oklch(0.65 0.18 20)`) - Highlights
**Neutral:** Grays and whites - Text and backgrounds

---

## Responsive Breakpoints

- **Mobile:** Under 768px
- **Tablet:** 768px - 1024px  
- **Desktop:** 1024px and above

---

## SEO Metadata

- **Homepage:** "HDN Integrated Farm - Fresh Organic Produce & Farm Events"
- **Products:** "Our Products - HDN Integrated Farm"
- **Pick & Pay:** Auto-generated
- **Events:** Auto-generated
- **About:** "About Us - HDN Integrated Farm"
- **Blog:** "Blog - HDN Integrated Farm"
- **Contact:** Auto-generated

---

## Performance Optimizations

- ✅ Image optimization with Next.js Image component (placeholder icons)
- ✅ CSS-in-JS for minimal bundle
- ✅ Responsive images
- ✅ Fast page loads
- ✅ Mobile-first design
- ✅ No external dependencies except UI library

---

## Accessibility Features

- ✅ Semantic HTML
- ✅ ARIA labels where needed
- ✅ Keyboard navigation
- ✅ Color contrast compliance
- ✅ Alt text for images
- ✅ Screen reader friendly

---

This website is fully functional and ready to use. All content can be easily managed by editing the data file!
