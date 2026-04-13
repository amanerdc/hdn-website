import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { EventsPageClient } from '@/components/public/events-page-client';
import { getActivities, getEvents } from '@/lib/site-content';

export default async function EventsPage() {
  const [activities, events] = await Promise.all([getActivities(), getEvents()]);

  return (
    <div className="page-shell">
      <Navigation />

      <section className="section-band">
        <div className="section-shell">
          <div className="hero-card px-6 py-10 md:px-10 md:py-12">
            <span className="eyebrow">HDN Integrated Farm Events</span>
            <div className="mt-5 grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-center">
              <div>
                <h1 className="text-5xl font-semibold leading-[0.95] text-foreground md:text-6xl">Browse Our Events and Activities</h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                  Events and activities that connect you to the farm and community. Join us for hands-on experiences, fresh food, and fun!
                </p>
              </div>
              <div className="image-frame aspect-[4/3]">
                <img src="/events/farm.jpg" alt="HDN Integrated Farm Events Overview" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <EventsPageClient activities={activities} events={events} />
      <Footer />
    </div>
  );
}
