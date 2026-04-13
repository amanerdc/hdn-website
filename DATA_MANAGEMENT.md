# HDN Farm Website - Data Management Guide

This guide explains how to edit and manage all the farm data on your website.

## Overview

All farm data is stored in one file: `/lib/farm-data.ts`

This file contains:
- Farm information (name, contact details, social media)
- Products (vegetables, fruits, herbs)
- Events (farm tours, workshops, markets)
- Pick & Pay dates (available harvest sessions)
- Blog posts (articles and news)

## Farm Information

**Location:** `/lib/farm-data.ts` → `farmInfo` object

```typescript
export const farmInfo = {
  name: 'HDN Integrated Farm',                    // Your farm name
  tagline: 'Fresh Organic Produce & Community Events',
  location: 'Lusaka, Zambia',                    // Farm address
  description: 'HDN Integrated Farm is committed to...',  // About text
  phone: '+260 (your phone number)',             // Contact phone
  email: 'contact@hdnfarm.com',                  // Contact email
  socialMedia: {
    facebook: 'https://facebook.com/yourfarm',   // Facebook URL
    instagram: 'https://instagram.com/yourfarm', // Instagram URL
    whatsapp: 'https://wa.me/260...',            // WhatsApp number
  },
};
```

**Edit:** Simply update the strings with your farm's information.

---

## Products

**Location:** `/lib/farm-data.ts` → `products` array

### Add a Product

```typescript
{
  id: 1,                                    // Unique number
  name: 'Fresh Tomatoes',                   // Product name
  category: 'Vegetables',                   // Category (Vegetables, Fruits, Herbs)
  description: 'Ripe, juicy tomatoes...',   // Description (appears on product page)
  price: '5.99',                            // Price per unit
  unit: 'per kg',                           // Unit (per kg, per bunch, per lb, etc)
  image: '/products/tomatoes.jpg',          // Image path
  availability: true,                       // Is it available? (true/false)
  inStock: 45,                              // How many in stock
}
```

### Update a Product

Find the product in the `products` array and update any fields:
- Change `price` to update cost
- Change `inStock` to update quantity
- Set `availability: false` to hide a product
- Update `description` for product details

### Remove a Product

Delete the entire product object from the `products` array.

### Product Categories

Currently supported:
- `Vegetables`
- `Fruits`
- `Herbs`

To add a new category, simply use it in a product's `category` field.

---

## Events

**Location:** `/lib/farm-data.ts` → `events` array

### Add an Event

```typescript
{
  id: 1,                                    // Unique number
  title: 'Farm Tour & Workshop',            // Event name
  date: '2026-02-15',                       // Date (YYYY-MM-DD format)
  time: '09:00 AM',                         // Start time
  duration: '2 hours',                      // How long event lasts
  description: 'Join us for a guided tour...', // Event description
  capacity: 30,                             // Max participants
  booked: 12,                               // Currently booked
  price: '10.00',                           // Price per person (use '0.00' for free)
  image: '/events/tour.jpg',                // Event image path
}
```

### Update an Event

- Change `booked` number as people book
- Update `date` and `time` for new sessions
- Change `capacity` if you want more/fewer participants
- Set `price: '0.00'` to make event free

### Update Available Spots

Spots available = `capacity - booked`

Example: If capacity is 30 and 12 are booked, there are 18 spots available.

---

## Pick & Pay Dates

**Location:** `/lib/farm-data.ts` → `pickAndPayDates` array

### Add a Date

```typescript
{
  id: 1,                                    // Unique number
  date: '2026-02-16',                       // Date (YYYY-MM-DD format)
  dayOfWeek: 'Sunday',                      // Day name
  startTime: '07:00 AM',                    // Harvest start time
  endTime: '12:00 PM',                      // Harvest end time
  availableSpots: 40,                       // Total spots for this date
  booked: 15,                               // Currently booked
}
```

### Update Booking Status

Change the `booked` number as customers book pick & pay sessions.

Example: If 5 new people book, change `booked: 15` to `booked: 20`

---

## Blog Posts

**Location:** `/lib/farm-data.ts` → `blogPosts` array

### Add a Blog Post

```typescript
{
  id: 1,                                    // Unique number
  title: 'Benefits of Organic Farming',     // Article title
  slug: 'benefits-organic-farming',         // URL-friendly name (use hyphens, no spaces)
  author: 'HDN Farm Team',                  // Who wrote it
  date: '2026-01-15',                       // Publication date (YYYY-MM-DD)
  excerpt: 'Discover why organic farming...',  // Short preview text
  content: 'Full article content...',       // Main article text
  image: '/blog/organic.jpg',               // Article image path
}
```

### Edit a Blog Post

Find the post and update:
- `title` - Article headline
- `excerpt` - Preview text shown on blog listing
- `content` - Full article text
- `author` - Author name
- `date` - When it was published

### Update the Slug

The `slug` is used in the URL. Keep it:
- Lowercase
- Using hyphens instead of spaces
- Short and descriptive

Example: `"benefits-organic-farming"` becomes `/blog/benefits-organic-farming`

---

## Common Changes

### Change a Product's Price

```typescript
// Before
{ id: 1, name: 'Fresh Tomatoes', price: '5.99', ... }

// After (new price)
{ id: 1, name: 'Fresh Tomatoes', price: '7.49', ... }
```

### Mark a Product as Out of Stock

```typescript
// Before
{ id: 1, name: 'Fresh Tomatoes', availability: true, ... }

// After
{ id: 1, name: 'Fresh Tomatoes', availability: false, ... }
```

### Update Event Booking Count

```typescript
// Before - 12 people booked
{ id: 1, title: 'Farm Tour', booked: 12, capacity: 30, ... }

// After - 15 people booked
{ id: 1, title: 'Farm Tour', booked: 15, capacity: 30, ... }
```

### Add New Contact Information

```typescript
export const farmInfo = {
  name: 'HDN Integrated Farm',
  email: 'newemail@hdnfarm.com',    // Updated email
  phone: '+260 123 456 789',        // Updated phone
  // ...
};
```

---

## Date Format

Always use this format: `YYYY-MM-DD`

Examples:
- `2026-01-15` = January 15, 2026
- `2026-02-28` = February 28, 2026
- `2026-12-25` = December 25, 2026

---

## Image Paths

All images are stored in `/public/`:

- **Products:** `/public/products/`
- **Events:** `/public/events/`
- **Blog:** `/public/blog/`

When you add a new image:
1. Save it to the appropriate folder
2. Use the path in your data: `/products/myimage.jpg`

---

## Testing Your Changes

After editing `/lib/farm-data.ts`:

1. Save the file
2. The website will automatically refresh
3. Check the changes appear correctly

If something looks wrong:
- Check you haven't accidentally deleted a comma or quote
- Make sure all data is in the correct format
- Look for any red error messages in the browser console

---

## Troubleshooting

### Changes not appearing?
- Save the file
- Hard refresh the browser (Ctrl+Shift+R or Cmd+Shift+R)

### Numbers appearing as text?
- Make sure numbers are NOT in quotes: `price: 5.99` (not `price: '5.99'`)
- Dates SHOULD be in quotes: `date: '2026-02-15'`

### Products not showing?
- Check the `availability` is `true`
- Verify the product is added to the `products` array

### Events not booking?
- Make sure `booked` is less than `capacity`
- Check the date is in the future

---

## Need Help?

Refer to the `/lib/farm-data.ts` file for examples of how data should be formatted.

The website will show errors in the browser console if something is wrong with the data format.

Good luck managing your farm's website!
