import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const experienceOptions = [
  {
    slug: 'pollinights',
    label: 'PolliNights',
    intro: 'An evening farm escape with fresh air, relaxing vibes, and curated night experiences for groups and families.',
  },
  {
    slug: 'pick-and-pay',
    label: 'Pick & Pay',
    intro: 'Harvest your own fresh produce and pay by weight. Great for weekend bonding and hands-on farm learning.',
  },
  {
    slug: 'events',
    label: 'Events and Activities',
    intro: 'Explore farm-led events and activities designed for students, families, organizations, and curious first-time visitors.',
  },
];

export const metadata = {
  title: 'Farm Experiences - HDN Integrated Farm',
  description: 'Choose your preferred experience at HDN Integrated Farm.',
};

export default function ExperiencePage() {
  return (
    <div className="page-shell">
      <Navigation />

      <section className="section-band">
        <div className="leaf-blob left-0 top-10 h-64 w-64" />
        <div className="section-shell relative">
          <div className="hero-card px-6 py-10 md:px-10 md:py-12">
            <span className="eyebrow">
              <Leaf size={14} />
              Farm Experience
            </span>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.95] text-foreground md:text-6xl">Choose an Experience</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
              Pick where you want to start, and we&apos;ll guide you to the details and inquiry steps.
            </p>
          </div>
        </div>
      </section>

      <section className="section-band-tinted">
        <div className="section-shell">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {experienceOptions.map((option) => (
              <Link key={option.slug} href={`/${option.slug}`}>
                <Card className="h-full transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(33,74,52,0.14)]">
                  <CardHeader>
                    <CardTitle className="text-2xl">{option.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-7 text-muted-foreground">{option.intro}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
