import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const stayOptions = [
  {
    slug: 'book-a-treehouse',
    label: 'Book a Treehouse',
    intro: 'View treehouse images and send your preferred schedule for a relaxing farm stay experience.',
  },
  {
    slug: 'invest-in-a-residential-resort',
    label: 'Invest in a Residential Resort',
    intro: 'Learn why building your own resort-style property near HDN Integrated Farm is a strong long-term opportunity.',
  },
];

export const metadata = {
  title: 'Stay - HDN Integrated Farm',
  description: 'Select your preferred stay option at HDN Integrated Farm.',
};

export default function StayPage() {
  return (
    <div className="page-shell">
      <Navigation />

      <section className="section-band">
        <div className="leaf-blob left-0 top-10 h-64 w-64" />
        <div className="section-shell relative">
          <div className="hero-card px-6 py-10 md:px-10 md:py-12">
            <span className="eyebrow">
              <Leaf size={14} />
              Stay
            </span>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.95] text-foreground md:text-6xl">Select a Stay Option</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
              Explore short-stay treehouse bookings or long-term resort investment opportunities around the farm.
            </p>
          </div>
        </div>
      </section>

      <section className="section-band-tinted">
        <div className="section-shell">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {stayOptions.map((option) => (
              <Link key={option.slug} href={`/stay/${option.slug}`}>
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
