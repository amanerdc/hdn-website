// Initial seed and fallback data for farm content

export type FarmInfo = {
  id?: number;
  name: string;
  tagline: string;
  location: string;
  description: string;
  phone: string;
  email: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    tiktok: string;
  };
};

export type Product = {
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

export type FarmEvent = {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  description: string;
  capacity: number;
  booked: number;
  availability: boolean;
  price: string;
  image: string;
};

export type FarmActivity = {
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

export type TesdaCourse = {
  id: string;
  title: string;
  duration: string;
  focus: string;
  image: string;
  availability: boolean;
};

export type PickAndPayDate = {
  id: number;
  date: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  availableSpots: number;
  booked: number;
};

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
};

export const farmInfo: FarmInfo = {
  name: 'HDN Integrated Farm',
  tagline: 'Fresh Produce & Community Events',
  location: 'Brgy. Carolina, Naga City',
  description: 'HDN Integrated Farm is committed to sustainable agriculture and bringing fresh produce directly to our community. We offer farm tours, pick & pay experiences, and regular community events.',
  phone: '+63 (phone number)',
  email: 'hdnintegratedfarm.ph@gmail.com',
  socialMedia: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com',
  },
};

export const products: Product[] = [
  {
    id: 1,
    name: 'Pineapple',
    category: 'Fruits',
    description: 'Ripe, juicy pineapples grown organically without pesticides.',
    price: '150.00',
    unit: 'per kg',
    image: '/products/pineapple.jpeg',
    availability: true,
    inStock: 45,
  },
  {
    id: 2,
    name: 'Guava',
    category: 'Fruits',
    description: 'Farm-fresh guavas, packed with vitamin C and natural antioxidants',
    price: '120.00',
    unit: 'per kg',
    image: '/products/guava.jpg',
    availability: true,
    inStock: 30,
  },
  {
    id: 3,
    name: 'Dragon Fruit',
    category: 'Fruits',
    description: 'Freshly harvested dragon fruit with tiny crunchy seeds',
    price: '180.00',
    unit: 'per kg',
    image: '/products/dragon-fruit.jpeg',
    availability: true,
    inStock: 60,
  },
  {
    id: 4,
    name: 'Avocado',
    category: 'Fruits',
    description: 'Creamy, nutrient-rich avocados, ideal for savory and sweet dishes',
    price: '150.00',
    unit: 'per kg',
    image: '/products/avocado.jpg',
    availability: true,
    inStock: 25,
  },
  {
    id: 5,
    name: 'Jackfruit',
    category: 'Fruits',
    description: 'Harvest-fresh jackfruit, with tender golden pods and natural sweetness.',
    price: '200.00',
    unit: 'per kg',
    image: '/products/jack-fruit.jpg',
    availability: true,
    inStock: 40,
  },
  {
    id: 6,
    name: 'Brahman Stud Cattle',
    category: 'Livestock',
    description: 'High-quality Brahman stud cattle for breeding purposes.',
    price: '7000.00',
    unit: 'per head',
    image: '/products/brahman-male.jpg',
    availability: true,
    inStock: 5,
  },
  {
    id: 7,
    name: 'Angus Female Cattle',
    category: 'Livestock',
    description: 'High-quality Angus female cattle. Ideal for breeding and meat production.',
    price: '5000.00',
    unit: 'per head',
    image: '/products/angus-female.png',
    availability: true,
    inStock: 7,
  },
];

export const events: FarmEvent[] = [
/*
  {
    id: 1,
    title: 'Farmers Market Day',
    date: '2026-02-22',
    time: '08:00 AM',
    duration: '4 hours',
    description: 'Our weekly farmers market featuring fresh produce, local crafts, and live music.',
    capacity: 100,
    booked: 45,
    availability: true,
    price: '0.00',
    image: '/events/market_new.jpg',
  },
  {
    id: 2,
    title: 'Harvest Festival Weekend',
    date: '2026-03-15',
    time: '09:00 AM',
    duration: '6 hours',
    description: 'Celebrate the season with farm booths, local food, and live performances for the whole family.',
    capacity: 200,
    booked: 120,
    availability: true,
    price: '100.00',
    image: '/events/farm.jpg',
  },
  {
    id: 3,
    title: 'Cooking Class with Farm Produce',
    date: '2026-03-01',
    time: '02:00 PM',
    duration: '2.5 hours',
    description: 'Learn to prepare delicious meals using fresh ingredients from our farm.',
    capacity: 20,
    booked: 8,
    availability: true,
    price: '300.00',
    image: '/events/cooking_new.jpg',
  },
  {
    id: 4,
    title: 'Kids Farm Adventure Day',
    date: '2026-03-08',
    time: '10:00 AM',
    duration: '3 hours',
    description: 'A family event with games, animal interactions, and beginner-friendly planting workshops.',
    capacity: 50,
    booked: 22,
    availability: false,
    price: '150.00',
    image: '/events/kids_new.jpg',
  },
  **/
];

export const activities: FarmActivity[] = [
  {
    id: 1,
    title: 'Hand Feed Baby Calves',
    daysAvailable: 'Monday to Friday',
    schedule: '9:00 AM to 4:00 PM',
    duration: '15 minutes',
    description: 'A hands-on experience where you can feed and care for our adorable baby calves.',
    availability: false,
    price: '100.00',
    image: '/feed-baby-calves.jpg',
  },
  {
    id: 2,
    title: 'Kalesa Ride',
    daysAvailable: 'Saturday and Sunday',
    schedule: '10:00 AM to 5:00 PM',
    duration: '30 minutes',
    description: 'Enjoy a traditional kalesa ride around our scenic farm, perfect for families and couples.',
    availability: true,
    price: '150.00',
    image: '/kalesa-ride.png',
  },
];

export const pickAndPayDates: PickAndPayDate[] = [
  {
    id: 1,
    date: '2026-02-16',
    dayOfWeek: 'Sunday',
    startTime: '07:00 AM',
    endTime: '12:00 PM',
    availableSpots: 40,
    booked: 15,
  },
  {
    id: 2,
    date: '2026-02-23',
    dayOfWeek: 'Sunday',
    startTime: '07:00 AM',
    endTime: '12:00 PM',
    availableSpots: 40,
    booked: 28,
  },
  {
    id: 3,
    date: '2026-03-02',
    dayOfWeek: 'Sunday',
    startTime: '07:00 AM',
    endTime: '12:00 PM',
    availableSpots: 40,
    booked: 5,
  },
  {
    id: 4,
    date: '2026-03-09',
    dayOfWeek: 'Sunday',
    startTime: '07:00 AM',
    endTime: '12:00 PM',
    availableSpots: 40,
    booked: 12,
  },
];

export const tesdaCourses: TesdaCourse[] = [
  {
    id: 'intro-agri-crop-production',
    title: 'Introduction to Agricultural Crops Production',
    duration: '3 to 4 months',
    focus: 'This course includes the knowledge, skills, and attitude that you must have before working in the agricultural crops production sector.',
    image: '/tesda-1.jpg',
    availability: false,
  },
  {
    id: 'performing-nursery-operations',
    title: 'Performing Nursery Operations',
    duration: '2 to 3 months',
    focus: 'This course includes the knowledge, skills, and attitude that you must have in order to perform nursery operations and procedures.',
    image: '/tesda-2.jpg',
    availability: false,
  },
  {
    id: 'planting-crops',
    title: 'Planting Crops',
    duration: '2 to 3 months',
    focus: 'This course includes the knowledge, skills, and attitude that you must have in order to plant and manage crops effectively.',
    image: '/tesda-3.jpg',
    availability: false,
  },
  {
    id: 'caring-maintaining-crops',
    title: 'Caring and Maintaining Crops',
    duration: '1 to 2 months',
    focus: 'This course includes the knowledge, skills, and attitude that you must have in order to perform plant care and maintenance procedures.',
    image: '/tesda-4.jpg',
    availability: false,
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Benefits of Farming',
    slug: 'benefits-farming',
    author: 'HDN Integrated Farm Team',
    date: '2026-01-15',
    excerpt: 'Discover why farming is great for your health and the environment.',
    content: 'Fresh farming practices...',
    image: '/blog/organic.jpg',
  },
  {
    id: 2,
    title: 'Seasonal Produce Guide',
    slug: 'seasonal-produce-guide',
    author: 'HDN Integrated Farm Team',
    date: '2026-01-10',
    excerpt: 'Learn what produce is available in each season and how to select the best options.',
    content: 'Seasonal produce...',
    image: '/blog/seasonal.jpg',
  },
  {
    id: 3,
    title: 'Farm to Table Recipes',
    slug: 'farm-to-table-recipes',
    author: 'HDN Integrated Farm Team',
    date: '2026-01-05',
    excerpt: 'Easy recipes using fresh ingredients from our farm.',
    content: 'Farm to table recipes...',
    image: '/blog/recipes.jpg',
  },
];
