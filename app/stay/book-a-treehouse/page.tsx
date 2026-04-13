'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import {
  ArrowRight,
  Bird,
  CalendarDays,
  Leaf,
  MoonStar,
  PawPrint,
  Sparkles,
  Trees,
  UtensilsCrossed,
  DiamondMinus, 
  DiamondPlus,
  type LucideIcon,
} from 'lucide-react';

import { Navigation } from '../../../components/navigation';
import { Footer } from '../../../components/footer';
import { ScrollRevealInit } from '../../../components/scroll-reveal-init';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Button } from '../../../components/ui/button';

const storyHighlights = [
  {
    title: 'Built with the pili trees',
    description:
      'HDN Integrated Farm treehouses are thoughtfully integrated into sturdy pili trees, letting guests stay close to nature in a setting that feels rooted, elevated, and distinct.',
    icon: Trees,
  },
  {
    title: 'A cabin-in-the-woods mood',
    description:
      'The atmosphere leans warm, quiet, and enchanting, like a hidden woodland cabin where mornings begin with birdsong and evenings slow down naturally.',
    icon: Sparkles,
  },
  {
    title: 'A real farm escape',
    description:
      'Beyond the treehouse itself, your stay becomes part of a living farm experience with fresh air, open space, and activities that make the getaway feel full and memorable.',
    icon: Bird,
  },
];

const reasonsToBook = [
  {
    title: 'Relax',
    description: 'Trade noise, traffic, and rushed routines for calm views, gentle breezes, and a slower pace.',
    icon: Leaf,
  },
  {
    title: 'Fun getaway from the city',
    description: 'Turn a simple overnight stay into a refreshing countryside break that feels easy, playful, and restorative.',
    icon: Sparkles,
  },
  {
    title: 'Enchanting cabin feel',
    description: 'Enjoy the charm of a tucked-away woodland retreat while still being part of the wider HDN farm story.',
    icon: MoonStar,
  },
];

const farmMoments = [
  {
    title: 'PolliNights',
    description: "Experience the farm after dark through HDN's dragon fruit pollination adventure.",
    href: '/pollinights',
    icon: MoonStar,
  },
  {
    title: 'Pick & Pay',
    description: 'Harvest fresh produce and bring home a piece of the farm after your stay.',
    href: '/pick-and-pay',
    icon: Leaf,
  },
  {
    title: 'Animal encounters',
    description: 'Spend time around the farm and enjoy simple, delightful interactions with the animals.',
    href: '/events',
    icon: PawPrint,
  },
  {
    title: 'Farm meals and slow mornings',
    description: 'Pair the treehouse mood with fresh farm flavors, open air, and unhurried time outdoors.',
    href: '/products/food-and-beverage',
    icon: UtensilsCrossed,
  },
];

const treehouseGallery = [
  {
    src: '/events/tour_new.jpg',
    alt: 'Treehouse-inspired farm stay surrounded by greenery',
  },
  {
    src: '/events/farm.jpg',
    alt: 'Farm landscape that reflects the peaceful treehouse atmosphere',
  },
  {
    src: '/events/market_new.jpg',
    alt: 'Open farm spaces for guests exploring the HDN experience',
  },
];

export default function BookATreehousePage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const composedMessage = [
      `Check-in Date: ${formData.checkIn}`,
      `Check-out Date: ${formData.checkOut}`,
      `Guests: ${formData.guests}`,
      '',
      formData.notes || 'No additional notes provided.',
    ].join('\n');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          subject: 'Treehouse Booking Inquiry',
          message: composedMessage,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          checkIn: '',
          checkOut: '',
          guests: '2',
          notes: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Treehouse inquiry error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 10000);
    }
  };

  return (
    <div className="page-shell">
      <ScrollRevealInit />
      <Navigation />

      <section className="section-band overflow-hidden">
        <div className="leaf-blob float-leaf -left-12 top-12 h-72 w-72 opacity-60" />
        <div className="leaf-blob float-leaf-reverse right-0 top-16 h-80 w-80 opacity-45" />
        <div className="section-shell relative">
          <div className="hero-card motion-fade-up overflow-hidden px-6 py-10 md:px-10 md:py-12">
            <div className="relative">
              <div className="relative z-20 max-w-3xl motion-fade-up delay-1">
                <span className="eyebrow">
                  <Leaf size={14} />
                  HDN Treehouses <DiamondMinus size={12} />
                </span>
                <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.95] text-foreground md:text-6xl">
                  Treehouses woven into the story of HDN Integrated Farm
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                  More than a room, the treehouse stay is imagined as an elevated farm retreat. Built into sturdy pili
                  trees, it brings together rest, wonder, and the quiet charm of an enchanting cabin in the woods.
                </p>
                <div className="mt-8 flex flex-col gap-3 motion-fade-up delay-2 sm:flex-row">
                  <Link href="#booking">
                    <Button size="lg">
                      Book a Treehouse
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                  <Link href="#story">
                    <Button size="lg" variant="outline">
                      Explore the story
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative mt-12 min-h-[700px] motion-fade-up delay-3 md:min-h-[760px] lg:min-h-[780px]">
                <div className="absolute inset-x-[16%] top-[14%] h-[46%] rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute left-0 top-6 z-20 max-w-[300px] rounded-[1.75rem] border border-white/75 bg-white/74 p-5 shadow-[0_16px_40px_rgba(33,74,52,0.12)] backdrop-blur-md md:left-6 md:top-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">What They Are</p>
                  <p className="mt-3 text-base leading-8 text-muted-foreground">
                    HDN treehouses are designed as stays integrated into sturdy pili trees, so the tree itself becomes
                    part of the feeling, the view, and the memory of the place.
                  </p>
                </div>

                <div className="absolute right-0 top-12 z-20 max-w-[300px] rounded-[1.75rem] border border-white/75 bg-[rgba(244,248,241,0.88)] p-5 shadow-[0_16px_40px_rgba(33,74,52,0.12)] backdrop-blur-md md:right-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Why Stay</p>
                  <p className="mt-3 text-base leading-8 text-muted-foreground">
                    It feels like a cabin in the woods, but gentler and more open, made for relaxing, reconnecting,
                    and stepping out of city rhythm for a while.
                  </p>
                </div>

                <div className="absolute left-1/2 top-[16%] z-10 flex w-full max-w-5xl -translate-x-1/2 justify-center px-4 md:top-[1%]">
                  <img
                    src="/treehouse-element.png"
                    alt="Illustrated HDN treehouse concept integrated with pili trees"
                    className="h-auto w-full max-w-[760px] object-contain drop-shadow-[0_24px_34px_rgba(33,74,52,0.18)]"
                  />
                </div>

                <div className="absolute bottom-[20%] left-4 z-20 max-w-[300px] rounded-[1.75rem] border border-white/75 bg-[rgba(255,252,247,0.88)] p-5 shadow-[0_16px_40px_rgba(33,74,52,0.12)] backdrop-blur-md md:left-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">The Mood</p>
                  <p className="mt-3 text-base leading-8 text-muted-foreground">
                    Expect quiet mornings, filtered light through leaves, and that enchanting tucked-away feeling that
                    makes the countryside feel a little magical.
                  </p>
                </div>

                <div className="absolute bottom-[16%] right-4 z-20 max-w-[320px] rounded-[1.75rem] border border-white/75 bg-white/76 p-5 shadow-[0_16px_40px_rgba(33,74,52,0.12)] backdrop-blur-md md:right-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Around the Stay</p>
                  <p className="mt-3 text-base leading-8 text-muted-foreground">
                    The treehouse is only part of the story. PolliNights, Pick &amp; Pay, animal encounters, and slow
                    farm mornings help weave the whole HDN experience around it.
                  </p>
                </div>

                <div className="absolute inset-x-0 bottom-0 z-20 px-0 md:px-4">
                  <div className="grid gap-4 reveal-children md:grid-cols-3">
                    {[
                      ['Nature-first stay', 'Integrated into pili trees'],
                      ['Designed to slow down', 'For rest, romance, and fresh air'],
                      ['Close to farm fun', 'PolliNights, Pick & Pay, and more'],
                    ].map(([title, description]) => (
                      <div key={title} className="rounded-[1.5rem] border border-white/70 bg-white/62 p-4 shadow-[0_14px_32px_rgba(33,74,52,0.08)] backdrop-blur-md">
                        <p className="text-base font-semibold text-foreground">{title}</p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="story" className="section-band-tinted scroll-mt-28">
        <div className="section-shell">
          <div className="mx-auto max-w-6xl">
            <div className="relative motion-fade-up overflow-hidden rounded-[2.4rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(240,247,239,0.92))] px-6 py-10 shadow-[0_18px_50px_rgba(33,74,52,0.12)] md:px-10 md:py-14">
              <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-3xl" />
              <img
                src="/treehouse-element.png"
                alt="Treehouse concept woven into the HDN story section"
                className="pointer-events-none absolute left-1/2 top-1/2 w-[78%] max-w-3xl -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.12]"
              />
              <div className="relative grid gap-8 xl:grid-cols-[1.25fr_0.75fr] xl:gap-10">
                <div className="space-y-5 motion-fade-up delay-1">
                  <span className="eyebrow">The Treehouse Story</span>
                  <h2 className="text-4xl font-semibold text-foreground md:text-5xl">
                    A peaceful farm escape shaped by pili trees, woodland charm, and slow countryside days
                  </h2>
                  <p className="text-base leading-8 text-muted-foreground">
                    HDN Integrated Farm treehouses are imagined as stays integrated into sturdy pili trees, so the
                    structure feels rooted in the farm rather than placed on top of it. That connection gives the stay
                    its character: elevated and deeply tied to the landscape around it.
                  </p>
                  <p className="text-base leading-8 text-muted-foreground">
                    The appeal is simple and memorable. Guests come for relaxation, a fun break from the city, and the
                    enchanting cabin-in-the-woods feeling of waking up among leaves, open air, and quiet views.
                  </p>
                  <p className="text-base leading-8 text-muted-foreground">
                    The experience also opens into the rest of the farm, letting a restful overnight stay blend
                    naturally with PolliNights, Pick &amp; Pay, animal encounters, and slow mornings around fresh farm
                    food and open green spaces.
                  </p>
                </div>

                <div className="grid content-start gap-3 reveal-children">
                  {storyHighlights.map((item) => {
                    const Icon = item.icon as LucideIcon;

                    return (
                      <div
                        key={item.title}
                        className="rounded-[1.4rem] border border-white/75 bg-white/76 p-4 shadow-[0_12px_28px_rgba(33,74,52,0.09)] backdrop-blur-md"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Icon size={18} />
                        </div>
                        <p className="mt-3 text-base font-semibold text-foreground">{item.title}</p>
                        <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{item.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="relative mt-5 grid gap-5 reveal-children md:grid-cols-2">
                <div className="image-frame aspect-[16/10] overflow-hidden">
                  <img
                    src="/treehouse-1.jpg"
                    alt="Treehouse photo placeholder one at HDN Integrated Farm"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="image-frame aspect-[16/10] overflow-hidden">
                  <img
                    src="/treehouse-2.jpg"
                    alt="Treehouse photo placeholder two at HDN Integrated Farm"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="relative mt-6 grid gap-3 reveal-children md:grid-cols-3">
                {reasonsToBook.map((item) => {
                  const Icon = item.icon as LucideIcon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-[1.4rem] border border-white/75 bg-white/76 p-4 shadow-[0_12px_28px_rgba(33,74,52,0.09)] backdrop-blur-md"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon size={18} />
                      </div>
                      <p className="mt-3 text-base font-semibold text-foreground">{item.title}</p>
                      <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band-tinted">
        <div className="section-shell space-y-8">
          <div className="max-w-3xl motion-fade-up">
            <span className="eyebrow">Fun Around the Farm</span>
            <h2 className="mt-5 text-4xl font-semibold text-foreground md:text-5xl">
              Pair your treehouse stay with experiences that make the farm feel alive
            </h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              A treehouse stay becomes even more special when it opens into the rest of HDN Integrated Farm. Guests can
              explore signature activities, enjoy fresh farm moments, and build a fuller countryside escape.
            </p>
          </div>

          <div className="grid gap-6 reveal-children md:grid-cols-2 xl:grid-cols-4">
            {farmMoments.map((moment) => {
              const Icon = moment.icon;

              return (
                <Link key={moment.title} href={moment.href} className="group">
                  <Card className="h-full transition duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_20px_50px_rgba(33,74,52,0.14)]">
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon size={22} />
                      </div>
                      <CardTitle className="mt-4 flex items-center gap-2 text-2xl">
                        <span>{moment.title}</span>
                        <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-7 text-muted-foreground">{moment.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-6 reveal-children md:grid-cols-3">
            {treehouseGallery.map((image) => (
              <div key={image.src} className="image-frame aspect-[4/3]">
                <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="section-band scroll-mt-28">
        <div className="section-shell">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="hero-card motion-fade-up p-8 md:p-10">
              <span className="eyebrow">Booking Inquiry</span>
              <h2 className="mt-5 text-4xl font-semibold text-foreground md:text-5xl">Start planning your treehouse escape</h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Share your preferred dates and group details, and our team will help you with availability, rates, and
                the best way to enjoy the HDN treehouse experience.
              </p>
              <div className="mt-6 grid gap-4 reveal-children">
                {[
                  { icon: CalendarDays, description: 'Best for couples, friends, and small groups' },
                  { icon: Leaf, description: 'Designed for guests who want rest and a nature-first atmosphere' },
                  { icon: MoonStar, description: 'Easy to pair with PolliNights, Pick & Pay, and other farm visits' },
                ].map(({ icon: Icon, description }) => (
                  <div key={description} className="rounded-[1.5rem] border border-primary/10 bg-white/72 p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon size={18} />
                      </div>
                      <p className="text-sm leading-7 text-muted-foreground">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="motion-fade-up delay-1 border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-3xl">Treehouse Booking Form</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-foreground">Full Name</label>
                      <Input required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-foreground">Email</label>
                      <Input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="you@email.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-foreground">Phone</label>
                      <Input required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="09..." />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-foreground">Check-in</label>
                      <Input required type="date" value={formData.checkIn} onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })} />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-foreground">Check-out</label>
                      <Input required type="date" value={formData.checkOut} onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })} />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">Number of Guests</label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="h-12 w-full rounded-2xl border border-white/70 bg-white/72 px-4 text-sm shadow-[0_12px_28px_rgba(33,74,52,0.06)] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5+">5+ Guests</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">Notes (Optional)</label>
                    <Textarea
                      rows={5}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Tell us if you want to pair your stay with PolliNights, Pick & Pay, or other farm activities."
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                      Booking inquiry sent. We&apos;ll contact you with availability and rates.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                      Unable to send your inquiry right now. Please try again.
                    </div>
                  )}

                  <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                    {isSubmitting ? 'Sending Inquiry...' : 'Submit Booking Inquiry'}
                  </Button>
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
