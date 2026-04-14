import {
  type BlogPost,
  type FarmActivity,
  type FarmEvent,
  type FarmInfo,
  type PickAndPayDate,
  type Product,
  type TesdaCourse,
} from '@/lib/farm-data';

export type ResourceKey =
  | 'farmInfo'
  | 'products'
  | 'events'
  | 'activities'
  | 'pickAndPayDates'
  | 'tesdaCourses'
  | 'blogPosts';

export type FieldType = 'text' | 'textarea' | 'number' | 'boolean' | 'date' | 'time' | 'image' | 'email' | 'select';

export type AdminField = {
  path: string;
  label: string;
  type: FieldType;
  required?: boolean;
  disabledOnEdit?: boolean;
  placeholder?: string;
  helperText?: string;
  options?: string[];
};

export type ResourceShapeMap = {
  farmInfo: FarmInfo;
  products: Product;
  events: FarmEvent;
  activities: FarmActivity;
  pickAndPayDates: PickAndPayDate;
  tesdaCourses: TesdaCourse;
  blogPosts: BlogPost;
};

export type ResourceDefinition<TItem> = {
  key: ResourceKey;
  label: string;
  singularLabel: string;
  table: string;
  primaryKey: string;
  singleton?: boolean;
  emptyItem: TItem;
  fields: AdminField[];
  fromRecord?: (record: Record<string, unknown>) => TItem;
  toRecord?: (item: TItem) => Record<string, unknown>;
  orderBy?: {
    column: string;
    ascending: boolean;
  }[];
};

const farmInfoFields: AdminField[] = [
  { path: 'name', label: 'Farm name', type: 'text', required: true },
  { path: 'tagline', label: 'Tagline', type: 'text', required: true },
  { path: 'location', label: 'Location', type: 'text', required: true },
  { path: 'description', label: 'Description', type: 'textarea', required: true },
  { path: 'phone', label: 'Phone', type: 'text', required: true },
  { path: 'email', label: 'Email', type: 'email', required: true },
  { path: 'socialMedia.facebook', label: 'Facebook URL', type: 'text' },
  { path: 'socialMedia.instagram', label: 'Instagram URL', type: 'text' },
  { path: 'socialMedia.tiktok', label: 'TikTok URL', type: 'text' },
];

export const adminResourceDefinitions: {
  [K in ResourceKey]: ResourceDefinition<ResourceShapeMap[K]>;
} = {
  farmInfo: {
    key: 'farmInfo',
    label: 'Farm Info',
    singularLabel: 'Farm info',
    table: 'farm_info',
    primaryKey: 'id',
    singleton: true,
    emptyItem: {
      id: 1,
      name: '',
      tagline: '',
      location: '',
      description: '',
      phone: '',
      email: '',
      socialMedia: { facebook: '', instagram: '', tiktok: '' },
    },
    fields: farmInfoFields,
    fromRecord: (record) => ({
      id: Number(record.id ?? 1),
      name: String(record.name ?? ''),
      tagline: String(record.tagline ?? ''),
      location: String(record.location ?? ''),
      description: String(record.description ?? ''),
      phone: String(record.phone ?? ''),
      email: String(record.email ?? ''),
      socialMedia: {
        facebook: String(record.facebook_url ?? ''),
        instagram: String(record.instagram_url ?? ''),
        tiktok: String(record.tiktok_url ?? ''),
      },
    }),
    toRecord: (item) => ({
      id: item.id ?? 1,
      name: item.name,
      tagline: item.tagline,
      location: item.location,
      description: item.description,
      phone: item.phone,
      email: item.email,
      facebook_url: item.socialMedia.facebook,
      instagram_url: item.socialMedia.instagram,
      tiktok_url: item.socialMedia.tiktok,
    }),
  },
  products: {
    key: 'products',
    label: 'Products',
    singularLabel: 'Product',
    table: 'products',
    primaryKey: 'id',
    emptyItem: { id: 0, name: '', category: '', description: '', price: '0.00', unit: '', image: '', availability: true, inStock: 0 },
    fields: [
      { path: 'name', label: 'Name', type: 'text', required: true },
      {
        path: 'category',
        label: 'Category',
        type: 'select',
        required: true,
        options: ['Fruits', 'Vegetables', 'Food & Beverage', 'Agri-products', 'Nursery', 'Livestock'],
        helperText: 'Choose the product group used in the catalog and sort view.',
      },
      { path: 'description', label: 'Description', type: 'textarea', required: true },
      { path: 'price', label: 'Price', type: 'text', required: true, helperText: 'Use a numeric amount like 150.00.' },
      { path: 'unit', label: 'Unit', type: 'text', required: true, helperText: 'Examples: per kg, per head, per piece.' },
      { path: 'image', label: 'Image URL', type: 'image', required: true },
      { path: 'availability', label: 'Available', type: 'boolean' },
      { path: 'inStock', label: 'In stock', type: 'number', required: true },
    ],
    fromRecord: (record) => ({
      id: Number(record.id ?? 0),
      name: String(record.name ?? ''),
      category: String(record.category ?? ''),
      description: String(record.description ?? ''),
      price: String(record.price ?? '0.00'),
      unit: String(record.unit ?? ''),
      image: String(record.image ?? ''),
      availability: Boolean(record.availability),
      inStock: Number(record.in_stock ?? 0),
    }),
    toRecord: (item) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      description: item.description,
      price: item.price,
      unit: item.unit,
      image: item.image,
      availability: item.availability,
      in_stock: item.inStock,
    }),
    orderBy: [{ column: 'id', ascending: true }],
  },
  events: {
    key: 'events',
    label: 'Events',
    singularLabel: 'Event',
    table: 'events',
    primaryKey: 'id',
    emptyItem: { id: 0, title: '', date: '', time: '', duration: '', description: '', capacity: 0, booked: 0, availability: true, price: '0.00', image: '' },
    fields: [
      { path: 'title', label: 'Title', type: 'text', required: true },
      { path: 'date', label: 'Date', type: 'date', required: true },
      { path: 'time', label: 'Time', type: 'text', required: true },
      { path: 'duration', label: 'Duration', type: 'text', required: true },
      { path: 'description', label: 'Description', type: 'textarea', required: true },
      { path: 'capacity', label: 'Capacity', type: 'number', required: true },
      { path: 'booked', label: 'Booked', type: 'number', required: true },
      { path: 'availability', label: 'Available', type: 'boolean' },
      { path: 'price', label: 'Price', type: 'text', required: true },
      { path: 'image', label: 'Image URL', type: 'image', required: true },
    ],
    orderBy: [{ column: 'date', ascending: true }, { column: 'id', ascending: true }],
  },
  activities: {
    key: 'activities',
    label: 'Activities',
    singularLabel: 'Activity',
    table: 'activities',
    primaryKey: 'id',
    emptyItem: { id: 0, title: '', daysAvailable: '', schedule: '', duration: '', description: '', availability: true, price: '0.00', image: '' },
    fields: [
      { path: 'title', label: 'Title', type: 'text', required: true },
      { path: 'daysAvailable', label: 'Days available', type: 'text', required: true },
      { path: 'schedule', label: 'Schedule', type: 'text', required: true },
      { path: 'duration', label: 'Duration', type: 'text', required: true },
      { path: 'description', label: 'Description', type: 'textarea', required: true },
      { path: 'availability', label: 'Available', type: 'boolean' },
      { path: 'price', label: 'Price', type: 'text', required: true },
      { path: 'image', label: 'Image URL', type: 'image', required: true },
    ],
    fromRecord: (record) => ({
      id: Number(record.id ?? 0),
      title: String(record.title ?? ''),
      daysAvailable: String(record.days_available ?? ''),
      schedule: String(record.schedule ?? ''),
      duration: String(record.duration ?? ''),
      description: String(record.description ?? ''),
      availability: Boolean(record.availability),
      price: String(record.price ?? '0.00'),
      image: String(record.image ?? ''),
    }),
    toRecord: (item) => ({
      id: item.id,
      title: item.title,
      days_available: item.daysAvailable,
      schedule: item.schedule,
      duration: item.duration,
      description: item.description,
      availability: item.availability,
      price: item.price,
      image: item.image,
    }),
    orderBy: [{ column: 'id', ascending: true }],
  },
  pickAndPayDates: {
    key: 'pickAndPayDates',
    label: 'Pick & Pay Dates',
    singularLabel: 'Pick & Pay date',
    table: 'pick_and_pay_dates',
    primaryKey: 'id',
    emptyItem: { id: 0, date: '', dayOfWeek: '', startTime: '', endTime: '', availableSpots: 0, booked: 0 },
    fields: [
      { path: 'date', label: 'Date', type: 'date', required: true },
      { path: 'dayOfWeek', label: 'Day of week', type: 'text', required: true },
      { path: 'startTime', label: 'Start time', type: 'text', required: true },
      { path: 'endTime', label: 'End time', type: 'text', required: true },
      { path: 'availableSpots', label: 'Available spots', type: 'number', required: true },
      { path: 'booked', label: 'Booked', type: 'number', required: true },
    ],
    fromRecord: (record) => ({
      id: Number(record.id ?? 0),
      date: String(record.date ?? ''),
      dayOfWeek: String(record.day_of_week ?? ''),
      startTime: String(record.start_time ?? ''),
      endTime: String(record.end_time ?? ''),
      availableSpots: Number(record.available_spots ?? 0),
      booked: Number(record.booked ?? 0),
    }),
    toRecord: (item) => ({
      id: item.id,
      date: item.date,
      day_of_week: item.dayOfWeek,
      start_time: item.startTime,
      end_time: item.endTime,
      available_spots: item.availableSpots,
      booked: item.booked,
    }),
    orderBy: [{ column: 'date', ascending: true }, { column: 'id', ascending: true }],
  },
  tesdaCourses: {
    key: 'tesdaCourses',
    label: 'TESDA Courses',
    singularLabel: 'TESDA course',
    table: 'tesda_courses',
    primaryKey: 'id',
    emptyItem: { id: '', title: '', duration: '', focus: '', image: '', availability: false },
    fields: [
      { path: 'title', label: 'Title', type: 'text', required: true },
      { path: 'duration', label: 'Duration', type: 'text', required: true },
      { path: 'focus', label: 'Focus', type: 'textarea', required: true },
      { path: 'image', label: 'Image URL', type: 'image', required: true },
      { path: 'availability', label: 'Available', type: 'boolean' },
    ],
    orderBy: [{ column: 'title', ascending: true }],
  },
  blogPosts: {
    key: 'blogPosts',
    label: 'Blog Posts',
    singularLabel: 'Blog post',
    table: 'blog_posts',
    primaryKey: 'id',
    emptyItem: { id: 0, title: '', slug: '', author: '', date: '', excerpt: '', content: '', image: '' },
    fields: [
      { path: 'title', label: 'Title', type: 'text', required: true },
      { path: 'slug', label: 'Slug', type: 'text', required: true },
      { path: 'author', label: 'Author', type: 'text', required: true },
      { path: 'date', label: 'Date', type: 'date', required: true },
      { path: 'excerpt', label: 'Excerpt', type: 'textarea', required: true },
      { path: 'content', label: 'Content', type: 'textarea', required: true },
      { path: 'image', label: 'Image URL', type: 'image', required: true },
    ],
    orderBy: [{ column: 'date', ascending: false }, { column: 'id', ascending: false }],
  },
};
