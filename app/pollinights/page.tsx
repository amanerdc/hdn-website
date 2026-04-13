'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Clock3, Flower2, Hand, Mail, MapPinned, School, Sprout, TentTree, DiamondMinus, DiamondPlus } from 'lucide-react';

import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';

export default function PolliNightsPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    group: '',
    position: '',
    email: '',
    phone: '',
    participants: '',
    details: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings/pollinights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setSubmitStatus('success');
      setFormData({
        fullName: '',
        group: '',
        position: '',
        email: '',
        phone: '',
        participants: '',
        details: '',
      });
      setTimeout(() => setSubmitStatus('idle'), 10000);
    } catch (error) {
      console.error('Error sending PolliNights booking request:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 10000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-shell">
      <Navigation />

      <section className="section-band overflow-hidden">
        <div className="leaf-blob -left-12 top-20 h-72 w-72 opacity-60" />
        <div className="leaf-blob right-0 top-12 h-80 w-80 opacity-50" />
        <div className="section-shell relative">
          <div className="hero-card px-6 py-10 md:px-10 md:py-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
              <div>
                <span className="eyebrow">PolliNights Experience <DiamondMinus size={14} className="text-muted-foreground" /></span>
                <h1 className="mt-5 text-5xl font-semibold leading-[0.95] text-foreground md:text-6xl">
                  Dragon Fruit Pollination Experience
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                  A fun, educational night adventure on the farm.
                </p>
                <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
                  Give your students a one-of-a-kind learning experience they will never forget. Our Dragon Fruit
                  Pollination Experience allows kindergarten and elementary students to actively participate in the
                  pollination process, an essential step in growing dragon fruit.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="#details">
                    <Button size="lg">
                      Explore the experience
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                  <Link href="#booking">
                    <Button variant="outline" size="lg">
                      Book PolliNights
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="space-y-5">
                <div className="image-frame bg-white p-2">
                  <img src="/BloomQuest_1.png" alt="PolliNights hero experience at HDN Integrated Farm" className="h-auto w-full rounded-[1.25rem]" />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    ['Guided experience', 'Students move through a themed bloom trail with guidance from the farm team.'],
                    ['Active learning', 'Every child experiences pollination as a real, memorable farm activity.'],
                  ].map(([title, description]) => (
                    <div key={title} className="glass-panel p-5">
                      <p className="text-lg font-semibold text-foreground">{title}</p>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">{description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="details" className="section-band-tinted scroll-mt-28">
        <div className="section-shell">
          <div className="mx-auto max-w-5xl space-y-8">
            <div>
              <span className="eyebrow">What to Expect</span>
              <div className="mt-6 grid gap-4">
                {[
                  { icon: MapPinned, item: 'Guided night tour of the farm during bloom season' },
                  { icon: Hand, item: 'Hands-on pollination activity' },
                  { icon: Flower2, item: 'Costumes (butterfly and bee wings) for immersive learning' },
                  { icon: TentTree, item: 'Lighted pathways and themed camp setup' },
                  { icon: Sprout, item: 'Introduction to farm produce and agriculture' },
                ].map(({ icon: Icon, item }) => (
                  <div key={item} className="feature-card flex items-start gap-4 p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon size={20} />
                    </div>
                    <p className="text-sm leading-7 text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-[2rem] border border-primary/10 bg-white/78 p-6 shadow-[0_18px_50px_rgba(33,74,52,0.12)]">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Bonus</p>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Students who participate will be invited back to harvest the fruits they pollinated and enjoy 30%
                off during the Pick &amp; Pay experience.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="image-frame aspect-[16/10] p-2">
                <img src="/BloomQuest_2.png" alt="PolliNights participants on the farm at night" className="h-full w-full rounded-[1.25rem] object-cover" />
              </div>

              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-foreground shadow-[0_18px_50px_rgba(33,74,52,0.2)] aspect-[16/10]">
                <video
                  src="/BloomQuest_Video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover opacity-75"
                />
                <div className="absolute" />
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Learning Outcomes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-7 text-muted-foreground">Students will understand:</p>
                <div className="grid gap-3">
                  {[
                    'How pollination works',
                    'The role of insects in food production',
                    'The life cycle of dragon fruit',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-[1.25rem] bg-primary/6 px-4 py-3 text-sm text-foreground">
                      <Check size={18} className="shrink-0 text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="booking" className="section-band scroll-mt-28">
        <div className="section-shell">
          <div className="mx-auto grid max-w-5xl gap-8">
            <div className="hero-card p-8 md:p-10">
              <span className="eyebrow">Booking Request</span>
              <h2 className="mt-5 text-4xl font-semibold text-foreground md:text-5xl">
                Book a PolliNights experience with us
              </h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Share your group details and we&apos;ll reach out to arrange the best bloom-night schedule for your
                students, family, or organization.
              </p>
              <div className="mt-6 grid gap-4">
                {[
                  { icon: School, title: 'Best for', description: 'Schools, daycares, families, and organized student groups' },
                  { icon: Clock3, title: 'Ideal timing', description: 'Scheduled around dragon fruit bloom nights and farm availability' },
                  { icon: Mail, title: 'Follow-up', description: 'Our team will confirm details by email after receiving your request' },
                ].map(({ icon: Icon, title, description }) => (
                  <div key={title} className="rounded-[1.5rem] border border-primary/10 bg-white/72 p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon size={18} />
                      </div>
                      <p className="text-lg font-semibold text-foreground">{title}</p>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{description}</p>
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-3xl">Send a PolliNights Booking Request</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold">Full Name</label>
                    <Input
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">Group</label>
                    <Input
                      required
                      value={formData.group}
                      onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                      placeholder="School, daycare, family..."
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">Position</label>
                    <Input
                      required
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      placeholder="Teacher, principal, parent..."
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">Email</label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">Phone</label>
                    <Input
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="09..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold">Number of Participants</label>
                    <Input
                      required
                      type="number"
                      min="1"
                      value={formData.participants}
                      onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                      placeholder="How many participants will join?"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold">Details</label>
                    <Textarea
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="Share preferred dates, age group, questions, or anything else we should know."
                      rows={5}
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <div className="md:col-span-2 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                      Thank you. Your PolliNights booking request has been sent.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="md:col-span-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                      Sorry, there was an error sending your request. Please try again.
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send PolliNights Booking Request'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
