import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { ScrollRevealInit } from '../components/scroll-reveal-init';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { getActivities, getEvents, getProducts } from '../lib/site-content';
import { ArrowRight, Calendar, Check, Hand, Leaf, MoonStar, Sprout, Trophy, Users, Banana, ShoppingBasket } from 'lucide-react';

export default async function Home() {
  const [products, events, activities] = await Promise.all([getProducts(), getEvents(), getActivities()]);
  const featuredProducts = products.slice(0, 3);
  const upcomingEvents = events
    .filter((event) => event.availability && event.capacity - event.booked > 0)
    .slice(0, 2);
  const fallbackActivities = activities.filter((activity) => activity.availability).slice(0, 2);
  const showEventsOnHomepage = upcomingEvents.length > 0;
  const polliNightsHighlights = [
    {
      icon: Hand,
      title: 'Hands-on learning',
      description: 'Kids experience real-life pollination, not just theory.',
    },
    {
      icon: Leaf,
      title: 'Deeper love for nature',
      description: 'Understand how food grows and the role of pollinators.',
    },
    {
      icon: MoonStar,
      title: 'Unique nighttime adventure',
      description: 'A rare, memorable farm experience under the stars.',
    },
    {
      icon: Trophy,
      title: 'Rewarding outcome',
      description: 'Harvest the fruits they helped create with a special discount.',
    },
  ];

  return (
    <div className="page-shell">
      <ScrollRevealInit />
      <Navigation />

      <section className="section-band overflow-hidden">
        <div className="leaf-blob float-leaf -left-20 top-24 h-60 w-60" />
        <div className="leaf-blob float-leaf-reverse right-0 top-12 h-72 w-72 opacity-60" />
        <div className="section-shell relative">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-7 motion-fade-up">
              <span className="eyebrow">
                <Sprout size={14} />
                Organic Farming
              </span>
              <div className="space-y-5">
                <h1 className="max-w-3xl text-5xl font-semibold leading-[0.92] text-balance text-foreground md:text-7xl">
                  Fresh harvests, vibrant events, and a deeper connection to nature.
                </h1>
                <p className="section-copy">
                  HDN Integrated Farm brings together fresh produce, meaningful visits, and community-centered events to create a farm experience that goes beyond the ordinary. Explore our offerings and discover the farm in a whole new way.
                </p>
              </div>
              <div className="flex flex-col gap-3 motion-fade-up delay-2 sm:flex-row">
                <Link href="/products">
                  <Button size="lg">
                    Explore Products
                    <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link href="/pick-and-pay">
                  <Button variant="outline" size="lg">
                    Book Pick & Pay
                  </Button>
                </Link>
              </div>
              <div className="grid max-w-2xl grid-cols-1 gap-4 reveal-children sm:grid-cols-3">
                {[
                  { value: 'Sustainable Farming', label: 'Carefully grown produce' },
                  { value: 'Community-led', label: 'Events and experiences' },
                  { value: 'Fresh daily', label: 'Ready for your table' },
                ].map((item) => (
                  <div key={item.value} className="glass-panel px-5 py-4">
                    <p className="text-lg font-semibold text-foreground">{item.value}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-card soft-grid relative p-6 motion-fade-up delay-3 md:p-8">
              <div className="leaf-blob float-leaf left-4 top-5 h-28 w-28 opacity-55" />
              <div className="leaf-blob float-leaf-reverse bottom-8 right-8 h-36 w-36 opacity-55" />
              <div className="relative grid gap-5 md:grid-cols-[0.82fr_1.18fr]">
                <div className="image-frame aspect-[4/5]">
                  <img src={featuredProducts[0]?.image} alt={featuredProducts[0]?.name} className="h-full w-full object-cover" />
                </div>
                <div className="space-y-5">
                  <div className="image-frame aspect-[4/3]">
                   <img src="dragon-fruit-home.jpg" alt="Dragon Fruit Home Picture" className="h-full w-full object-cover" />
                  </div>
                  <div className="glass-panel p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Featured harvest</p>
                    <h2 className="mt-3 text-3xl font-semibold text-foreground">Best Variety of Tropical Fruits</h2>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      We pride ourselves on offering the freshest and most delicious tropical fruit. Hinog sa puno, kaya mas matamis! 
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band-tinted">
        <div className="section-shell">
          <div className="mb-12 flex flex-col gap-4 motion-fade-up md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">Experience the Difference</span>
              <h2 className="mt-4 text-4xl font-semibold text-foreground md:text-5xl">Why HDN Integrated Farm?</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground">
              At HDN Integrated Farm, we go beyond just providing fresh produce. We create a holistic farm experience that connects you to the land, the food, and the community. Here's what sets us apart:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 reveal-children md:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: Sprout, title: 'Clean Growing', description: 'Produce grounded in freshness, care, and natural quality.' },
              { icon: Banana, title: 'Diverse Selection', description: 'A wide variety of fresh produce to suit every taste.' },
              { icon: ShoppingBasket, title: 'Pick & Pay', description: 'Experience the joy of selecting and harvesting your own produce.' },
              { icon: Calendar, title: 'Vibrant Events', description: 'Engaging activities that bring the community together.' },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="feature-card">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="section-shell">
          <div className="mb-12 flex flex-col gap-4 motion-fade-up md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">Featured Products</span>
              <h2 className="mt-4 text-4xl font-semibold text-foreground md:text-5xl">Fresh selections from the farm</h2>
            </div>
            <Link href="/products">
              <Button variant="ghost">View all products</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 reveal-children md:grid-cols-3">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="image-frame mx-6 mt-6 aspect-[4/3]">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardDescription className="text-primary">{product.category}</CardDescription>
                      <CardTitle className="mt-2 text-2xl">{product.name}</CardTitle>
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      {product.availability ? 'In stock' : 'Unavailable'}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-7 text-muted-foreground">{product.description}</p>
                  <div className="mt-6 flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-semibold text-primary">PHP {product.price}</p>
                      <p className="text-sm text-muted-foreground">{product.unit}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{product.inStock} available</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band overflow-hidden">
        <div className="leaf-blob float-leaf -right-10 top-10 h-72 w-72 opacity-55" />
        <div className="leaf-blob float-leaf-reverse bottom-8 left-0 h-60 w-60 opacity-50" />
        <div className="section-shell relative">
          <div className="hero-card p-6 motion-fade-up md:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
              <div className="space-y-6 motion-fade-up delay-1">
                <span className="eyebrow">Step Into a Magical Night on the Farm</span>
                <div className="space-y-4">
                  <h2 className="text-4xl font-semibold leading-tight text-foreground md:text-6xl">
                    PolliNights with HDN Integrated Farm
                  </h2>
                  <p className="text-base leading-8 text-muted-foreground">
                    Where flowers bloom under the moon and children become pollinators. When the dragon fruit flowers bloom, they only open for one magical night.
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-foreground shadow-[0_18px_50px_rgba(33,74,52,0.2)] motion-fade-up delay-2">
                <video
                  src="/BloomQuest_Video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full max-h-[420px] w-full object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,27,22,0.18),rgba(18,27,22,0.42))]" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75">PolliNights Showcase at HDN Integrated Farm</p>
                  <p className="mt-2 max-w-md text-sm leading-7 text-white/88">
                    A moonlit preview of the guided pollination experience.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 reveal-children md:grid-cols-2 xl:grid-cols-4">
              {polliNightsHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="feature-card p-5">
                    <div className="flex items-center gap-3 text-primary">
                      <Icon size={25} />
                      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">{item.title}</p>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/bloomquest#details">
                <Button size="lg" className="min-w-64">
                  Learn More
                  <ArrowRight size={16} />
                </Button>
              </Link>
              <Link href="/bloomquest#booking">
                <Button variant="outline" size="lg" className="min-w-64">
                  Get in touch
                </Button>
              </Link>
            </div>

            <div className="mt-10 grid gap-6 reveal-children lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
              <div className="image-frame p-2">
                <img src="/BloomQuest_1.png" alt="Children enjoying PolliNights at HDN Integrated Farm" className="h-full w-full rounded-[1.25rem] object-contain sm:object-cover" />
              </div>

              <div className="glass-panel p-6 md:p-8">
                <p className="text-base leading-8 text-muted-foreground">
                  At our farm, we turn this rare moment into an unforgettable experience for young explorers.
                  Equipped with butterfly and bee wings, students step into the role of real pollinators,
                  gently transferring pollen under glowing lights that guide their journey.
                </p>
                <p className="mt-4 text-base leading-8 text-muted-foreground">
                  This isn&apos;t just a farm visit. It&apos;s a hands-on lesson in nature and science.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-3 text-sm text-foreground sm:grid-cols-2">
                  {[
                    'Learn how pollination works in real life',
                    'Experience the role of bees and butterflies',
                    'Explore a beautifully lit night farm',
                    'Connect with where food truly comes from',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-[1.25rem] bg-primary/6 px-4 py-3">
                      <Check size={18} className="mt-0.5 flex-none text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-6 reveal-children lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">And there's more...</p>
                <h3 className="text-3xl font-semibold text-foreground md:text-4xl">The story doesn&apos;t end there.</h3>
                <p className="text-base leading-8 text-muted-foreground">
                  When the fruits they helped create are ready, they&apos;ll be invited back to harvest them with a
                  special pollinator 30% discount.
                </p>
                <p className="text-lg font-medium text-foreground">From flower, to fruit, to memory.</p>
                <Link href="/bloomquest#booking">
                  <Button size="lg">Book a PolliNights Experience</Button>
                </Link>
              </div>
              <div className="image-frame aspect-[16/10] p-2">
                <img src="/BloomQuest_2.png" alt="PolliNights dragon fruit pollination activity at night" className="h-full w-full rounded-[1.25rem] object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band-tinted">
        <div className="section-shell">
          <div className="mb-12 flex flex-col gap-4 motion-fade-up md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">{showEventsOnHomepage ? 'Upcoming Events' : 'Featured Activities'}</span>
              <h2 className="mt-4 text-4xl font-semibold text-foreground md:text-5xl">Experiences that bring people closer to the farm</h2>
            </div>
            <Link href="/events">
              <Button variant="ghost">{showEventsOnHomepage ? 'See all events' : 'See all activities'}</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 reveal-children md:grid-cols-2">
            {showEventsOnHomepage
              ? upcomingEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <div className="image-frame mx-6 mt-6 aspect-[16/9]">
                      <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
                    </div>
                    <CardHeader>
                      <CardDescription className="text-primary">{event.date}</CardDescription>
                      <CardTitle className="text-3xl">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-7 text-muted-foreground">{event.description}</p>
                      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>{event.time}</p>
                          <p>{event.capacity - event.booked} spots available</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-semibold text-primary">{event.price === '0.00' ? 'Free' : `PHP ${event.price}`}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              : fallbackActivities.map((activity) => (
                  <Card key={activity.id} className="overflow-hidden">
                    <div className="image-frame mx-6 mt-6 aspect-[16/9]">
                      <img src={activity.image} alt={activity.title} className="h-full w-full object-cover" />
                    </div>
                    <CardHeader>
                      <CardDescription className="text-primary">{activity.daysAvailable}</CardDescription>
                      <CardTitle className="text-3xl">{activity.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-7 text-muted-foreground">{activity.description}</p>
                      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>{activity.schedule}</p>
                          <p>{activity.duration}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-semibold text-primary">{activity.price === '0.00' ? 'Free' : `PHP ${activity.price}`}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            {(showEventsOnHomepage ? upcomingEvents.length : fallbackActivities.length) === 1 && (
              <Card className="overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
                <CardContent className="text-center py-12">
                  <p className="text-lg font-semibold text-foreground mb-6">Be the first to know. Join HDN for early access to all our latest events.</p>
                  <Link href="/membership">
                    <Button size="lg" className="gap-2">
                      Explore Membership
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="section-shell">
          <div className="hero-card px-6 py-10 text-center motion-fade-up md:px-12 md:py-14">
            <span className="eyebrow">Stay Connected</span>
            <h2 className="mt-5 text-4xl font-semibold text-foreground md:text-5xl">Join the HDN farm community</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              Reach out for product inquiries, event questions, or to plan your next visit. We&apos;d love to hear from you!
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/contact">
                <Button size="lg">Get in touch</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
