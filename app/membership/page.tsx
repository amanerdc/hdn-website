'use client';

import React, { useState } from 'react';
import { Footer } from '../../components/footer';
import { Navigation } from '../../components/navigation';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Leaf, Sparkles, Sprout, SunMedium, Users, Flower, Heart, DiamondMinus, DiamondPlus } from 'lucide-react';

const membershipPrograms = [
  {
    id: 'little-pollinators',
    name: 'Little Pollinators',
    audience: 'Ages 6 to 12',
    icon: Sparkles,
    description:
      'A playful introduction to farm life through the PolliNights Experience with guided dragon fruit pollination and educational activities.',
    highlights: ['Pollination kits', 'Camping', 'Butterfly and bee wings'],
    availability: false,
  },
  {
    id: 'senior-pollinators',
    name: 'Senior Pollinators',
    audience: 'Ages 60+',
    icon: Heart,
    description:
      'A fun and engaging program for seniors to connect with nature through the PolliNights Experience.',
    highlights: ['Pollination kits', 'Camping', 'Fun getaway'],
    availability: false,
  },
  {
    id: 'harvesters',
    name: 'Harvesters',
    audience: 'All Ages',
    icon: SunMedium,
    description:
      'A community membership for harvest participation where you get 20% of your harvest',
    highlights: ['Seasonal harvest', 'Produce Perks', 'Immersive Experience'],
    availability: false,
  },
  {
    id: 'beekeepers',
    name: 'Beekeepers',
    audience: 'Adults & partner organizations',
    icon: Flower,
    description:
      'An advanced pathway focused on stingless beekeeping and long-term farm partnership initiatives. Harvest the honey of the bees you nurtured.',
    highlights: ['Produce perks', 'Conservation advocacy', 'Collaborative partnerships'],
    availability: false,
  },
];

type MembershipChoice = 'Little Pollinators' | 'Senior Pollinators' | 'Harvesters' | 'Beekeepers';

export default function MembershipPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    schoolOrOrganization: '',
    email: '',
    phone: '',
    program: 'Little Pollinators' as MembershipChoice,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings/membership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          age: '',
          schoolOrOrganization: '',
          email: '',
          phone: '',
          program: 'Little Pollinators',
          message: '',
        });
        setTimeout(() => setSubmitStatus('idle'), 10000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 10000);
      }
    } catch (error) {
      console.error('Error sending membership signup request:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 10000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-shell">
      <Navigation />

      <section className="section-band">
        <div className="leaf-blob left-0 top-10 h-64 w-64" />
        <div className="section-shell relative">
          <div className="hero-card px-6 py-10 md:px-10 md:py-12">
            <span className="eyebrow">
              <Users size={14} />
              HDN Membership Programs
            </span>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.95] text-foreground md:text-6xl">Grow With Our Community</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
              Whether you're a Little Pollinator, Senior Pollinator, Harvester, or a Beekeeper, our membership programs offer unique ways to connect with nature, learn about sustainable farming, and be part of our farm community. Explore the different programs and find the perfect fit for you or your loved ones.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {membershipPrograms.map((program) => (
                <a
                  key={program.id}
                  href={`#${program.id}`}
                  className="inline-flex items-center rounded-full border border-primary/25 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
                >
                  {program.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-band-tinted">
        <div className="section-shell grid grid-cols-1 gap-6 md:grid-cols-2">
          {membershipPrograms.map((program) => {
            const Icon = program.icon;
            return (
              <Card key={program.id} id={program.id} className="scroll-mt-36 border-white/75">
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <CardTitle className="inline-flex items-center gap-2 text-3xl">
                      <Icon size={22} className="text-primary" />
                      {program.name}
                    </CardTitle>
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      {program.audience}
                    </span>
                  </div>
                  <div className="image-frame mt-5 aspect-[16/8]">
                    <img src={`/${program.id}.jpg`} alt={`${program.name} membership`} className="h-full w-full object-cover" />
                  </div>
                  <span
                    className={`inline-flex justify-self-start shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                      program.availability ? 'bg-primary/10 text-primary' : 'bg-gray-200 text-muted-foreground'
                    }`}
                  >
                      {program.availability ? <DiamondPlus size={12} /> : <DiamondMinus size={12} />}
                      {program.availability ? 'Available' : 'Coming soon'}
                    </span>
                  <CardDescription className="mt-2 max-w-3xl text-sm leading-7">{program.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-3 text-xs leading-6 text-muted-foreground md:grid-cols-3">
                    {program.highlights.map((highlight) => (
                      <li key={highlight} className="rounded-2xl border border-primary/12 bg-primary/5 px-4 py-3 text-foreground/80">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="membership-signup" className="section-band">
        <div className="section-shell">
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-4xl">Membership Sign Up</CardTitle>
              <CardDescription>Fill out the form and our team will contact you with next steps.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">First Name</label>
                  <Input required value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} placeholder="First name" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">Last Name</label>
                  <Input required value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} placeholder="Last name" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">Age</label>
                  <Input required type="number" min="1" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} placeholder="Age" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">School or Organization</label>
                  <Input required value={formData.schoolOrOrganization} onChange={(e) => setFormData({ ...formData, schoolOrOrganization: e.target.value })} placeholder="School or organization" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">Email</label>
                  <Input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">Phone</label>
                  <Input required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="09..." />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold">Membership Program</label>
                  <select
                    required
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value as MembershipChoice })}
                    className="h-12 w-full rounded-2xl border border-white/70 bg-white/72 px-4 text-sm shadow-[0_12px_28px_rgba(33,74,52,0.06)] outline-none transition-[color,box-shadow,border-color] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  >
                    <option value="Little Pollinators">Little Pollinators</option>
                    <option value="Senior Pollinators">Senior Pollinators</option>
                    <option value="Harvesters">Harvesters</option>
                    <option value="Beekeepers">Beekeepers</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold">Message (Optional)</label>
                  <Textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share any details or questions before we contact you."
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="md:col-span-2 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                    Thank you. Your membership sign up request has been sent.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="md:col-span-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                    Sorry, there was an error sending your request. Please try again.
                  </div>
                )}

                <div className="md:col-span-2">
                  <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Membership Sign Up'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
