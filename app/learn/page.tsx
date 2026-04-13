import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const learnOptions = [
  {
    slug: 'be-a-student-farmer',
    label: 'Be a Student Farmer',
    intro: 'Join a guided, hands-on farm immersion program designed to build practical agriculture knowledge and confidence.',
  },
  {
    slug: 'tesda-courses',
    label: 'TESDA Courses',
    intro: 'Inquire about TESDA-aligned learning opportunities offered by the farm and choose a course that fits your goals.',
  },
];

export const metadata = {
  title: 'Learn - HDN Integrated Farm',
  description: 'Explore learning opportunities at HDN Integrated Farm.',
};

export default function LearnPage() {
  return (
    <div className="page-shell">
      <Navigation />

      <section className="section-band">
        <div className="leaf-blob left-0 top-10 h-64 w-64" />
        <div className="section-shell relative">
          <div className="hero-card px-6 py-10 md:px-10 md:py-12">
            <span className="eyebrow">
              <Leaf size={14} />
              Learn
            </span>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.95] text-foreground md:text-6xl">Select a Learning Path</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
              Start with a practical student-farmer track or request details about TESDA courses available at the farm.
            </p>
          </div>
        </div>
      </section>

      <section className="section-band-tinted">
        <div className="section-shell">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {learnOptions.map((option) => (
              <Link key={option.slug} href={`/learn/${option.slug}`}>
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
