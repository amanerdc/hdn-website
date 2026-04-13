import 'server-only';

import { unstable_noStore as noStore } from 'next/cache';
import {
  activities as fallbackActivities,
  blogPosts as fallbackBlogPosts,
  type BlogPost,
  events as fallbackEvents,
  farmInfo as fallbackFarmInfo,
  type FarmActivity,
  type FarmEvent,
  type FarmInfo,
  pickAndPayDates as fallbackPickAndPayDates,
  type PickAndPayDate,
  products as fallbackProducts,
  type Product,
  tesdaCourses as fallbackTesdaCourses,
  type TesdaCourse,
} from '@/lib/farm-data';
import { getSupabaseServerClient, hasSupabaseServerConfig } from '@/lib/supabase';

type FarmInfoRecord = {
  id: number;
  name: string;
  tagline: string;
  location: string;
  description: string;
  phone: string;
  email: string;
  facebook_url: string;
  instagram_url: string;
  tiktok_url: string;
};

type ProductRecord = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  unit: string;
  image: string;
  availability: boolean;
  inStock: number;
};

type ActivityRecord = {
  id: number;
  title: string;
  daysAvailable: string;
  schedule: string;
  duration: string;
  description: string;
  availability: boolean;
  price: string;
  image: string;
};

type PickAndPayRecord = {
  id: number;
  date: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  availableSpots: number;
  booked: number;
};

function normalizeFarmInfo(record: FarmInfoRecord | null | undefined): FarmInfo {
  if (!record) {
    return fallbackFarmInfo;
  }

  return {
    id: record.id,
    name: record.name,
    tagline: record.tagline,
    location: record.location,
    description: record.description,
    phone: record.phone,
    email: record.email,
    socialMedia: {
      facebook: record.facebook_url,
      instagram: record.instagram_url,
      tiktok: record.tiktok_url,
    },
  };
}

async function fetchRows<T>(table: string, fallback: T, query?: (builder: any) => Promise<{ data: T | null; error: { message: string } | null }>): Promise<T> {
  noStore();

  if (!hasSupabaseServerConfig()) {
    return fallback;
  }

  try {
    const supabase = getSupabaseServerClient();
    const builder = supabase.from(table);
    const { data, error } = query ? await query(builder) : await builder.select('*');

    if (error || !data) {
      return fallback;
    }

    return data as T;
  } catch {
    return fallback;
  }
}

export async function getFarmInfo(): Promise<FarmInfo> {
  const record = await fetchRows<FarmInfoRecord | null>('farm_info', null, (builder) => builder.limit(1).maybeSingle());
  return normalizeFarmInfo(record);
}

export async function getProducts(): Promise<Product[]> {
  return fetchRows<ProductRecord[]>('products', fallbackProducts, (builder) =>
    builder.select('id,name,category,description,price,unit,image,availability,inStock:in_stock').order('id', { ascending: true }),
  );
}

export async function getEvents(): Promise<FarmEvent[]> {
  return fetchRows<FarmEvent[]>('events', fallbackEvents, (builder) => builder.order('date', { ascending: true }).order('id', { ascending: true }));
}

export async function getActivities(): Promise<FarmActivity[]> {
  return fetchRows<ActivityRecord[]>('activities', fallbackActivities, (builder) =>
    builder.select('id,title,daysAvailable:days_available,schedule,duration,description,availability,price,image').order('id', { ascending: true }),
  );
}

export async function getPickAndPayDates(): Promise<PickAndPayDate[]> {
  return fetchRows<PickAndPayRecord[]>('pick_and_pay_dates', fallbackPickAndPayDates, (builder) =>
    builder.select('id,date,dayOfWeek:day_of_week,startTime:start_time,endTime:end_time,availableSpots:available_spots,booked').order('date', { ascending: true }).order('id', { ascending: true }),
  );
}

export async function getTesdaCourses(): Promise<TesdaCourse[]> {
  return fetchRows<TesdaCourse[]>('tesda_courses', fallbackTesdaCourses, (builder) => builder.order('title', { ascending: true }));
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return fetchRows<BlogPost[]>('blog_posts', fallbackBlogPosts, (builder) => builder.order('date', { ascending: false }).order('id', { ascending: false }));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}
