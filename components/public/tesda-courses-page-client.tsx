'use client';

import React, { useMemo, useState } from 'react';
import { DiamondMinus, DiamondPlus } from 'lucide-react';
import { type TesdaCourse } from '@/lib/farm-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type TesdaCoursesPageClientProps = {
  tesdaCourses: TesdaCourse[];
};

export function TesdaCoursesPageClient({ tesdaCourses }: TesdaCoursesPageClientProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    courseId: tesdaCourses[0]?.id ?? '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const selectedCourse = useMemo(
    () => tesdaCourses.find((course) => course.id === formData.courseId) ?? tesdaCourses[0],
    [formData.courseId, tesdaCourses],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCourse) {
      return;
    }

    setIsSubmitting(true);

    const composedMessage = [
      `Selected TESDA Course: ${selectedCourse.title}`,
      `Course Duration: ${selectedCourse.duration}`,
      `Focus: ${selectedCourse.focus}`,
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
          subject: 'TESDA Course Inquiry',
          message: composedMessage,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          courseId: tesdaCourses[0]?.id ?? '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('TESDA inquiry error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 10000);
    }
  };

  return (
    <section className="section-band-tinted">
      <div className="section-shell space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {tesdaCourses.map((course) => (
            <Card key={course.id} className="flex flex-col overflow-hidden">
              <div className="image-frame mx-6 mt-6 aspect-[4/3]">
                <img src={course.image} alt={course.title} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
              </div>
              <CardHeader className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <CardTitle className="text-2xl">{course.title}</CardTitle>
                  </div>
                  <span className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${course.availability ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                    {course.availability ? <DiamondPlus size={12} /> : <DiamondMinus size={12} />}
                    {course.availability ? 'Available' : 'Coming soon'}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-semibold text-primary">Estimated Duration: {course.duration}</p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{course.focus}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader><CardTitle className="text-3xl">Course Inquiry Form</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div><label className="mb-2 block text-sm font-semibold text-foreground">Full Name</label><Input required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} placeholder="Your full name" /></div>
                <div><label className="mb-2 block text-sm font-semibold text-foreground">Email</label><Input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com" /></div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div><label className="mb-2 block text-sm font-semibold text-foreground">Phone</label><Input required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="09..." /></div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Select TESDA Course</label>
                  <select required value={formData.courseId} onChange={(e) => setFormData({ ...formData, courseId: e.target.value })} className="h-12 w-full rounded-2xl border border-white/70 bg-white/72 px-4 text-sm shadow-[0_12px_28px_rgba(33,74,52,0.06)] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50">
                    {tesdaCourses.map((course) => <option key={course.id} value={course.id}>{course.title}</option>)}
                  </select>
                </div>
              </div>
              <div><label className="mb-2 block text-sm font-semibold text-foreground">Additional Questions</label><Textarea rows={6} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Ask about schedule, fees, requirements, or training setup." /></div>
              {submitStatus === 'success' && <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">Course inquiry sent. We&apos;ll share more details soon.</div>}
              {submitStatus === 'error' && <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">Unable to send inquiry right now. Please try again.</div>}
              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">{isSubmitting ? 'Sending Inquiry...' : 'Send Inquiry'}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
