'use client';

import React, { useState } from 'react';
import { GraduationCap, Leaf, Sprout, Users, DiamondMinus, DiamondPlus } from 'lucide-react';
import { Navigation } from '../../../components/navigation';
import { Footer } from '../../../components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Button } from '../../../components/ui/button';

const learningTracks = [
  {
    title: 'Hands-on Crop Management',
    description: 'Understand soil preparation, planting cycles, crop care, and proper harvest timing using real farm scenarios.',
    icon: Sprout,
  },
  {
    title: 'Farm Operations and Teamwork',
    description: 'Experience farm routines, task planning, and group collaboration guided by HDN farm mentors.',
    icon: Users,
  },
  {
    title: 'Career and Skills Readiness',
    description: 'Build practical agriculture confidence that helps in future studies, livelihood, and agri-entrepreneurship.',
    icon: GraduationCap,
  },
];

export default function StudentFarmerPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    schoolOrOrganization: '',
    preferredStart: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const composedMessage = [
      `Preferred Start: ${formData.preferredStart}`,
      `Age: ${formData.age}`,
      `School / Organization: ${formData.schoolOrOrganization}`,
      '',
      formData.message || 'No additional notes provided.',
    ].join('\n');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          subject: 'Student Farmer Program Inquiry',
          message: composedMessage,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          age: '',
          schoolOrOrganization: '',
          preferredStart: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Student farmer inquiry error:', error);
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
              Be a Student Farmer <DiamondMinus size={12} />
            </span>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.95] text-foreground md:text-6xl">Enroll as a Student Farmer</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
              The Student Farmer Program gives learners direct exposure to real farm practices, mentorship, and values-driven
              agriculture education.
            </p>
          </div>
        </div>
      </section>

      <section className="section-band-tinted">
        <div className="section-shell">
          <div className="image-frame mb-8 aspect-video">
            <img src="/student-farmer.jpg" alt="Student farmer learning at HDN Integrated Farm" className="h-full w-full object-cover" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {learningTracks.map((track) => {
              const Icon = track.icon;

              return (
                <Card key={track.title}>
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon size={22} />
                    </div>
                    <CardTitle className="mt-4 text-2xl">{track.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-7 text-muted-foreground">{track.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-3xl">Program Inquiry Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">Full Name</label>
                    <Input required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} placeholder="Juan Dela Cruz" />
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
                    <label className="mb-2 block text-sm font-semibold text-foreground">Age</label>
                    <Input required type="number" min={10} value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} placeholder="18" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">School or Organization</label>
                    <Input
                      required
                      value={formData.schoolOrOrganization}
                      onChange={(e) => setFormData({ ...formData, schoolOrOrganization: e.target.value })}
                      placeholder="Your school or organization"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">Preferred Start Month</label>
                    <Input
                      required
                      value={formData.preferredStart}
                      onChange={(e) => setFormData({ ...formData, preferredStart: e.target.value })}
                      placeholder="Example: June 2026"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Tell us about your interest</label>
                  <Textarea
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share your goals and what you hope to learn as a student farmer."
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                    Inquiry sent successfully. Our team will contact you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                    Something went wrong while sending your inquiry. Please try again.
                  </div>
                )}

                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? 'Sending Inquiry...' : 'Submit Inquiry'}
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
