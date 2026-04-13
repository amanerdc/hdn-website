'use client';

import React, { useState } from 'react';
import { Gem, Leaf, MapPinned, TrendingUp, DiamondPlus, DiamondMinus } from 'lucide-react';
import { Navigation } from '../../../components/navigation';
import { Footer } from '../../../components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Button } from '../../../components/ui/button';

const reasons = [
  {
    title: 'Prime Farm-Adjacent Location',
    detail: 'Your resort residence sits near HDN Integrated Farm, giving owners and guests access to a unique agri-lifestyle setting.',
    icon: MapPinned,
  },
  {
    title: 'Strong Leisure Demand Potential',
    detail: 'Farm tourism and nature-based destinations continue to attract family and group bookings seeking quiet, fresh-air escapes.',
    icon: TrendingUp,
  },
  {
    title: 'Flexible Build Concept',
    detail: 'Owners can create a customized resort residence with pools, recreation spaces, and hospitality features aligned with their vision.',
    icon: Gem,
  },
];

const resortGallery = [
  {
    src: '/hnd-real-estate-1.png',
    alt: 'Residential resort concept with open family spaces',
  },
  {
    src: '/hnd-real-estate-2.png',
    alt: 'Resort property concept in a lush farm-adjacent area',
  },
  {
    src: '/hnd-real-estate-3.png',
    alt: 'Leisure property concept with nature-focused design',
  },
];

export default function InvestInResidentialResortPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    budgetRange: '',
    timeline: '',
    plan: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const composedMessage = [
      `Budget Range: ${formData.budgetRange}`,
      `Investment Timeline: ${formData.timeline}`,
      '',
      formData.plan || 'No development details provided yet.',
    ].join('\n');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          subject: 'Residential Resort Investment Inquiry',
          message: composedMessage,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          budgetRange: '',
          timeline: '',
          plan: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Resort investment inquiry error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 10000);
    }
  };

  return (
    <div className="page-shell">
      <Navigation />

      <section className="section-band">
        <div className="leaf-blob left-0 top-8 h-64 w-64" />
        <div className="section-shell relative">
          <div className="hero-card px-6 py-10 md:px-10 md:py-12">
            <span className="eyebrow">
              <Leaf size={14} />
              Real Estate Investment <DiamondPlus size={12} />
            </span>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.95] text-foreground md:text-6xl">Invest in a Residential Resort</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
              Build a resort-style residential property near HDN Integrated Farm and take advantage of a distinctive nature-driven
              destination setting.
            </p>
          </div>
        </div>
      </section>

      <section className="section-band-tinted">
        <div className="section-shell space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {resortGallery.map((image) => (
              <div key={image.src} className="image-frame aspect-[4/3]">
                <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {reasons.map((reason) => {
              const Icon = reason.icon;

              return (
                <Card key={reason.title}>
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon size={22} />
                    </div>
                    <CardTitle className="mt-4 text-2xl">{reason.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-7 text-muted-foreground">{reason.detail}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Investment Inquiry Form</CardTitle>
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

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">Phone</label>
                    <Input required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="09..." />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">Budget Range</label>
                    <select
                      required
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="h-12 w-full rounded-2xl border border-white/70 bg-white/72 px-4 text-sm shadow-[0_12px_28px_rgba(33,74,52,0.06)] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                      <option value="" disabled>
                        Select budget range
                      </option>
                      <option value="under-3m">Under PHP 3M</option>
                      <option value="3m-6m">PHP 3M - PHP 6M</option>
                      <option value="6m-10m">PHP 6M - PHP 10M</option>
                      <option value="above-10m">Above PHP 10M</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Target Timeline</label>
                  <Input
                    required
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    placeholder="Example: Start development in Q1 2027"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Tell us your resort concept</label>
                  <Textarea
                    required
                    rows={6}
                    value={formData.plan}
                    onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                    placeholder="Describe your property vision, amenities, and target guests."
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                    Investment inquiry sent. Our team will reach out with next steps.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                    Unable to send your inquiry right now. Please try again.
                  </div>
                )}

                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? 'Sending Inquiry...' : 'Submit Investment Inquiry'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
