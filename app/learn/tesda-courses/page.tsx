import { Leaf } from 'lucide-react';
import { Navigation } from '../../../components/navigation';
import { Footer } from '../../../components/footer';
import { TesdaCoursesPageClient } from '@/components/public/tesda-courses-page-client';
import { getTesdaCourses } from '@/lib/site-content';

export default async function TesdaCoursesPage() {
  const tesdaCourses = await getTesdaCourses();

  return (
    <div className="page-shell">
      <Navigation />

      <section className="section-band">
        <div className="leaf-blob left-0 top-8 h-64 w-64" />
        <div className="section-shell relative">
          <div className="hero-card px-6 py-10 md:px-10 md:py-12">
            <span className="eyebrow"><Leaf size={14} />TESDA Courses</span>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.95] text-foreground md:text-6xl">TESDA Courses</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
              Select a TESDA course and send an inquiry for enrollment flow, requirements, class schedules, and farm-based training details.
            </p>
          </div>
        </div>
      </section>

      <TesdaCoursesPageClient tesdaCourses={tesdaCourses} />
      <Footer />
    </div>
  );
}
