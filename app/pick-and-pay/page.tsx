import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { PickAndPayPageClient } from '@/components/public/pick-and-pay-page-client';
import { getPickAndPayDates } from '@/lib/site-content';

export default async function PickAndPayPage() {
  const pickAndPayDates = await getPickAndPayDates();

  return (
    <div className="page-shell">
      <Navigation />

      <section className="section-band">
        <div className="section-shell">
          <div className="hero-card px-6 py-10 md:px-10 md:py-12">
            <span className="eyebrow">Pick & Pay Experience</span>
            <div className="mt-5 grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-center">
              <div>
                <h1 className="text-5xl font-semibold leading-[0.95] text-foreground md:text-6xl">Pick & Pay: Fresh Produce Direct from the Farm</h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                  Pick & Pay is our farm&apos;s unique experience where you can handpick fresh fruits directly from our fields and pay based on the weight of your harvest.
                </p>
              </div>
              <div className="image-frame aspect-[4/3]">
                <img src="/pick-and-pay-2.jpg" alt="Fresh harvest at HDN Farm" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <PickAndPayPageClient pickAndPayDates={pickAndPayDates} />

      <section className="section-band">
        <div className="section-shell">
          <div className="hero-card p-8 md:p-10">
            <span className="eyebrow">What to Expect</span>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {[
                ['Preparation', 'Wear comfortable clothing and bring your own baskets or bags. We will provide you with picking guidelines and safety instructions.'],
                ['The Experience', 'Select and harvest fresh produce directly from the fields. Our team will be available to help you choose the best fruits and show you proper harvesting techniques.'],
                ['Pricing', 'You pay for what you pick. Fresh produce is weighed at our farm stand and priced competitively. All produce is organic and pesticide-free.'],
                ['Cancellation', 'Cancellations must be made 24 hours in advance for a full refund. Weather may affect availability.'],
              ].map(([title, description]) => (
                <div key={title} className="rounded-[1.5rem] border border-primary/10 bg-white/72 p-6">
                  <h3 className="text-2xl font-semibold text-foreground">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
