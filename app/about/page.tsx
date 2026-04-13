import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { Card, CardContent } from '../../components/ui/card';
import { Droplets, Leaf, Sprout, Sun, Users } from 'lucide-react';

export const metadata = {
  title: 'About Us - HDN Integrated Farm',
  description: 'Learn about HDN Integrated Farm, our mission, values, and sustainable farming practices.',
};

const farmJourney = [
  {
    title: 'From vacant land to purposeful use',
    description:
      'HDN Integrated Farm began as a practical initiative under Enjoy Realty and Development Corporation. Instead of leaving vacant lots idle, the company planted forage crops to support livestock production and create a more productive use for the land.',
  },
  {
    title: 'Livestock powering the next step',
    description:
      'As livestock operations grew, manure was carefully collected and transformed into organic fertilizer through composting and vermiculture. This reduced waste while creating a valuable input for future agricultural development.',
  },
  {
    title: 'Expansion through connected resources',
    description:
      'With a steady supply of organic fertilizer, the farm expanded into orchards with fruit-bearing trees and selected vegetable crops. A nearby creek, paired with solar-powered pumping, now supports irrigation and provides clean drinking water for livestock.',
  },
];

const integratedSystems = [
  {
    icon: Sprout,
    tone: 'bg-primary/10 text-primary',
    title: 'Forage and Livestock',
    description: 'The farm started by matching available land with forage production to support livestock operations.',
  },
  {
    icon: Leaf,
    tone: 'bg-primary/10 text-primary',
    title: 'Organic Fertilizer Cycle',
    description: 'Composting and vermiculture convert livestock manure into organic fertilizer that feeds orchard and crop development.',
  },
  {
    icon: Sun,
    tone: 'bg-primary/10 text-primary',
    title: 'Solar-Powered Irrigation',
    description: 'Solar panels and a solar pump help deliver water efficiently from the nearby creek to the farm.',
  },
  {
    icon: Droplets,
    tone: 'bg-primary/10 text-primary',
    title: 'Shared Water System',
    description: 'The same water infrastructure supports crop irrigation while also supplying drinking water for the livestock.',
  },
];

export default function AboutPage() {
  return (
    <div className="page-shell">
      <Navigation />

      <section className="section-band">
        <div className="section-shell">
          <div className="hero-card grid gap-8 px-6 py-10 md:grid-cols-[1.1fr_0.9fr] md:px-10 md:py-12">
            <div>
              <span className="eyebrow">About us</span>
              <h1 className="mt-5 text-5xl font-semibold leading-[0.95] text-foreground md:text-6xl">
                Built Through <br></br>Connected Farm Systems
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                HDN Integrated Farm grew from a simple land-use initiative into an eco-friendly agricultural system
                where livestock, fertilizer, crops, and water infrastructure all work together.
              </p>
            </div>
            <div className="image-frame aspect-[4/3] md:aspect-auto">
              <img src="/about-1.jpg" alt="Fresh produce from HDN Integrated Farm" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-band-tinted">
        <div className="section-shell">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <div className="image-frame aspect-square">
              <img src="/about-2.jpg" alt="HDN farm harvest" className="h-full w-full object-cover" />
            </div>
            <div>
              <span className="eyebrow">Our Story</span>
              <h2 className="mt-5 text-4xl font-semibold text-foreground md:text-5xl">
                A purposeful beginning on available land.
              </h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-muted-foreground">
                <p>
                  HDN Integrated Farm began as a simple yet purposeful initiative under Enjoy Realty and Development
                  Corporation, a real estate developer with available vacant lots. Instead of leaving these lands idle,
                  the company maximized their potential by planting forage crops to support livestock production.
                </p>
                <p>
                  That first step created the foundation for a sustainable agricultural system, where each resource
                  could be used intentionally and every growing operation could contribute to the next.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="section-shell">
          <div className="mb-12 text-center">
            <span className="eyebrow">Farm Development</span>
            <h2 className="mt-5 text-4xl font-semibold text-foreground md:text-5xl">How the system came together</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {farmJourney.map((step, index) => (
              <Card key={step.title}>
                <CardContent className="pt-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-lg font-semibold text-primary">
                    0{index + 1}
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band-tinted">
        <div className="section-shell">
          <div className="hero-card p-8 md:p-10">
            <span className="eyebrow">Integrated Systems</span>
            <h2 className="mt-5 text-4xl font-semibold text-foreground md:text-5xl">
              Each part of the farm sustains the others
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
              Through interconnected processes in land use, livestock management, organic fertilizer production, crop
              cultivation, and water systems, HDN Integrated Farm developed into a productive and environmentally
              responsible farm ecosystem.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {integratedSystems.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="rounded-[1.5rem] border border-primary/10 bg-white/70 p-6">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.tone}`}>
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 rounded-[1.75rem] border border-primary/10 bg-white/75 p-6 md:p-8">
              <h3 className="text-2xl font-semibold text-foreground">What HDN Integrated Farm represents today</h3>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Today, HDN Integrated Farm stands as a model of an integrated farm where every component supports and
                sustains the others. What began with vacant land and forage crops has become a resilient, productive,
                and eco-friendly agricultural ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="section-shell">
          <div className="mb-12 text-center">
            <span className="eyebrow">Meet The Team</span>
            <h2 className="mt-5 text-4xl font-semibold text-foreground md:text-5xl">People behind the farm</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                name: 'Engr. Emeterio "BOY" L. Aman',
                role: 'Farm Owner & Manager',
                bio: 'With years of agricultural experience, Engr. Boy leads our sustainable farming initiatives.',
              },
              {
                name: 'Glendo D. Casin',
                role: 'Farm Supervisor',
                bio: 'Glendo ensures the farm runs smoothly, overseeing daily operations and crop management with a focus on quality and sustainability.',
              },
              {
                name: 'Jonalyn B. Bedes',
                role: 'Accounting Staff',
                bio: 'Jonalyn manages our financial records and ensures the farm operates within budgetary constraints.',
              },
            ].map((member) => (
              <Card key={member.name} className="overflow-hidden">
                <div className="image-frame mx-6 mt-6 aspect-[4/3] bg-[linear-gradient(135deg,rgba(34,80,56,0.12),rgba(122,196,145,0.2))]">
                  <div className="flex h-full w-full items-center justify-center">
                    <Users size={72} className="text-primary/35" />
                  </div>
                </div>
                <CardContent className="pt-0">
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.22em] text-primary">{member.role}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-foreground">{member.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
