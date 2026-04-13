import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ContactPageClient } from '@/components/public/contact-page-client';
import { getFarmInfo } from '@/lib/site-content';

export default async function ContactPage() {
  const farmInfo = await getFarmInfo();

  return (
    <div className="page-shell">
      <Navigation />

      <section className="section-band">
        <div className="section-shell">
          <div className="hero-card px-6 py-10 md:px-10 md:py-12">
            <span className="eyebrow">Contact Us</span>
            <div className="mt-5 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <h1 className="text-5xl font-semibold leading-[0.95] text-foreground md:text-6xl">We&apos;re only a message away!</h1>
                <p className="mt-5 text-base leading-8 text-muted-foreground md:text-lg">
                  Whether you have questions about our farm, want to book a tour, or just want to say hi, we&apos;d love to hear from you!
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ['Location', farmInfo.location],
                  ['Phone', farmInfo.phone],
                  ['Email', farmInfo.email],
                  ['Response', 'We reply as soon as possible'],
                ].map(([title, value]) => (
                  <div key={title} className="rounded-[1.5rem] border border-primary/10 bg-white/72 p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">{title}</p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactPageClient farmInfo={farmInfo} />

      <section className="section-band pt-8 md:pt-12">
        <div className="section-shell">
          <Card className="overflow-hidden">
            <CardHeader><CardTitle className="text-3xl">Find the farm</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <p className="text-base leading-8 text-muted-foreground">Visit us at HACIENDAS DE NAGA, J7V8+P35, Nursery Rd, Naga City, 4400 Camarines Sur.</p>
              <div className="overflow-hidden rounded-[1.5rem] border border-primary/10 bg-white/70">
                <iframe title="HDN Integrated Farm location map" src="https://www.google.com/maps?q=HACIENDAS%20DE%20NAGA%2C%20J7V8%2BP35%2C%20Nursery%20Rd%2C%20Naga%20City%2C%204400%20Camarines%20Sur&z=15&output=embed" className="h-[360px] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="section-band">
        <div className="section-shell">
          <div className="mb-12 text-center">
            <span className="eyebrow">FAQ&apos;s</span>
            <h2 className="mt-5 text-4xl font-semibold text-foreground md:text-5xl">Frequently asked questions</h2>
          </div>
          <div className="grid gap-5">
            {[
              ['What are your operating hours?', 'We are open daily from 7 AM to 6 PM. Pick & Pay sessions are available on Sundays from 7 AM to 12 PM.'],
              ['Do you deliver produce?', 'We currently operate from our farm location. However, contact us to discuss potential delivery arrangements for larger orders.'],
              ['Are all your products fresh?', 'Yes, 100% of our produce is picked at peak ripeness and delivered to you the same day.'],
              ['Can I book a group tour?', 'Absolutely! Groups of 10 or more can arrange special farm tours. Please contact us with your preferred date and group size.'],
            ].map(([question, answer]) => (
              <div key={question} className="glass-panel p-6">
                <h3 className="text-2xl font-semibold text-foreground">{question}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
