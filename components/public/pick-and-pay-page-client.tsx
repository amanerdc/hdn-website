'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Users } from 'lucide-react';
import { type PickAndPayDate } from '@/lib/farm-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type PickAndPayPageClientProps = {
  pickAndPayDates: PickAndPayDate[];
};

export function PickAndPayPageClient({ pickAndPayDates }: PickAndPayPageClientProps) {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', participants: '1', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings/pick-and-pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, dateId: selectedDate }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setTimeout(() => {
          setSubmitStatus('idle');
          setFormData({ name: '', email: '', phone: '', participants: '1', message: '' });
          setSelectedDate(null);
        }, 10000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 10000);
      }
    } catch (error) {
      console.error('Error sending booking request:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedData = selectedDate ? pickAndPayDates.find((date) => date.id === selectedDate) : null;

  return (
    <section className="section-band-tinted">
      <div className="section-shell">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.12fr_0.88fr]">
          <div>
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                ['Fresh Harvest', 'Pick vegetables at their peak ripeness'],
                ['Family Friendly', 'Great activity for kids and adults'],
                ['Available Sundays', 'Early morning harvests 7 AM - 12 PM'],
              ].map(([title, description]) => (
                <div key={title} className="feature-card p-5">
                  <h3 className="text-xl font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>

            <h2 className="mb-6 text-4xl font-semibold text-foreground">Available Dates</h2>
            <div className="space-y-4">
              {pickAndPayDates.map((date) => {
                const availableSpots = date.availableSpots - date.booked;
                const isSelected = selectedDate === date.id;

                return (
                  <Card key={date.id} className={`cursor-pointer border-2 transition ${isSelected ? 'border-primary bg-primary/5' : 'border-white/70 hover:border-primary/35'}`} onClick={() => setSelectedDate(date.id)}>
                    <CardContent className="pt-6">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-2xl font-semibold text-foreground">{date.dayOfWeek}, {date.date}</h3>
                          <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-2"><Clock size={16} />{date.startTime} - {date.endTime}</span>
                            <span className="flex items-center gap-2"><Users size={16} />{availableSpots} spots left</span>
                            <span className="flex items-center gap-2"><Calendar size={16} />{date.booked} booked</span>
                          </div>
                        </div>
                        <Button variant={isSelected ? 'default' : 'outline'} disabled={availableSpots === 0} onClick={(e) => { e.stopPropagation(); setSelectedDate(date.id); }}>
                          {availableSpots === 0 ? 'Full' : isSelected ? 'Selected' : 'Select'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-3xl">{selectedData ? 'Complete Your Booking' : 'Select a Date'}</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedData ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold">Full Name</label>
                      <Input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your name" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold">Email</label>
                      <Input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold">Phone</label>
                      <Input required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="09..." />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold">Number of People</label>
                      <Input required type="number" min="1" max={String(selectedData.availableSpots - selectedData.booked)} value={formData.participants} onChange={(e) => setFormData({ ...formData, participants: e.target.value })} />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold">Details</label>
                      <Textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Please provide any additional details here..." rows={3} />
                    </div>
                    {submitStatus === 'success' && <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">Thank you! We&apos;ll get back to you soon.</div>}
                    {submitStatus === 'error' && <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">Sorry, there was an error sending your request. Please try again.</div>}
                    <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send Booking Request'}</Button>
                  </form>
                ) : (
                  <p className="py-8 text-center text-sm leading-7 text-muted-foreground">Select a date card to continue your booking request.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
