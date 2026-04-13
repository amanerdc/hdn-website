'use client';

import React, { useState } from 'react';
import { Calendar, Clock, DiamondMinus, DiamondPlus, Timer, Users } from 'lucide-react';
import { type FarmActivity, type FarmEvent } from '@/lib/farm-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type BookingType = 'event' | 'activity';

type EventsPageClientProps = {
  activities: FarmActivity[];
  events: FarmEvent[];
};

export function EventsPageClient({ activities, events }: EventsPageClientProps) {
  const [bookingSelection, setBookingSelection] = useState<{ id: number; type: BookingType } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    participants: '1',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          bookingType: bookingSelection?.type,
          eventId: bookingSelection?.id,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setTimeout(() => {
          setSubmitStatus('idle');
          setFormData({ name: '', email: '', phone: '', participants: '1', message: '' });
          setBookingSelection(null);
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

  const selectedEvent = bookingSelection?.type === 'event' ? events.find((event) => event.id === bookingSelection.id) : null;
  const selectedActivity = bookingSelection?.type === 'activity' ? activities.find((activity) => activity.id === bookingSelection.id) : null;
  const selectedOffering = selectedEvent || selectedActivity;
  const selectedAvailableSpots = selectedEvent ? selectedEvent.capacity - selectedEvent.booked : null;

  return (
    <section className="section-band-tinted">
      <div className="section-shell">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h2 className="mb-6 text-4xl font-semibold text-foreground">Farm Activities</h2>
            <div className="space-y-6">
              {activities.length === 0 && <p className="rounded-2xl border border-dashed border-white/70 bg-white/50 px-6 py-8 text-center text-sm leading-7 text-muted-foreground">No activities available</p>}
              {activities.map((activity) => {
                const isAvailable = activity.availability;
                const selected = bookingSelection?.type === 'activity' && bookingSelection.id === activity.id;

                return (
                  <Card key={activity.id} className={`overflow-hidden border-2 transition ${isAvailable ? 'cursor-pointer' : 'cursor-not-allowed opacity-85'} ${selected ? 'border-primary bg-primary/5' : 'border-white/70 hover:border-primary/35'}`} onClick={() => isAvailable && setBookingSelection({ id: activity.id, type: 'activity' })}>
                    <div className="image-frame mx-6 mt-6 aspect-[16/9]">
                      <img src={activity.image} alt={activity.title} className="h-full w-full object-cover" />
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-3">
                        <CardTitle className="text-3xl">{activity.title}</CardTitle>
                        <span className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${isAvailable ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                          {isAvailable ? <DiamondPlus size={12} /> : <DiamondMinus size={12} />}
                          {isAvailable ? 'Available' : 'Coming soon'}
                        </span>
                      </div>
                      <CardDescription className="mt-2 flex flex-wrap gap-4 text-sm">
                        <span className="flex items-center gap-2"><Calendar size={16} />{activity.daysAvailable}</span>
                        <span className="flex items-center gap-2"><Clock size={16} />{activity.schedule}</span>
                        <span className="flex items-center gap-2"><Timer size={16} />{activity.duration}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-7 text-muted-foreground">{activity.description}</p>
                      <div className="mt-6 flex items-center justify-between gap-4">
                        <p className="text-2xl font-semibold text-primary">{activity.price === '0.00' ? 'Free' : `PHP ${activity.price}`}</p>
                        <Button variant={selected ? 'default' : 'outline'} disabled={!isAvailable} onClick={(e) => { e.stopPropagation(); if (isAvailable) setBookingSelection({ id: activity.id, type: 'activity' }); }}>
                          {!isAvailable ? 'Coming Soon' : selected ? 'Selected' : 'Select Activity'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <h2 className="mb-6 mt-12 text-4xl font-semibold text-foreground">Upcoming Events</h2>
            <div className="space-y-6">
              {events.length === 0 && <p className="rounded-2xl border border-dashed border-white/70 bg-white/50 px-6 py-8 text-center text-sm leading-7 text-muted-foreground">No events available</p>}
              {events.map((event) => {
                const availableSpots = event.capacity - event.booked;
                const isAvailable = event.availability && availableSpots > 0;
                const selected = bookingSelection?.type === 'event' && bookingSelection.id === event.id;

                return (
                  <Card key={event.id} className={`overflow-hidden border-2 transition ${isAvailable ? 'cursor-pointer' : 'cursor-not-allowed opacity-85'} ${selected ? 'border-primary bg-primary/5' : 'border-white/70 hover:border-primary/35'}`} onClick={() => isAvailable && setBookingSelection({ id: event.id, type: 'event' })}>
                    <div className="image-frame mx-6 mt-6 aspect-[16/9]">
                      <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-3">
                        <CardTitle className="text-3xl">{event.title}</CardTitle>
                        <span className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${isAvailable ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                          {isAvailable ? <DiamondPlus size={12} /> : <DiamondMinus size={12} />}
                          {isAvailable ? 'Available' : 'Coming soon'}
                        </span>
                      </div>
                      <CardDescription className="mt-2 flex flex-wrap gap-4 text-sm">
                        <span className="flex items-center gap-2"><Calendar size={16} />{event.date}</span>
                        <span className="flex items-center gap-2"><Clock size={16} />{event.time} ({event.duration})</span>
                        <span className="flex items-center gap-2"><Users size={16} />{isAvailable ? `${availableSpots} spots available` : 'Booking opens soon'}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-7 text-muted-foreground">{event.description}</p>
                      <div className="mt-6 flex items-center justify-between gap-4">
                        <p className="text-2xl font-semibold text-primary">{event.price === '0.00' ? 'Free' : `PHP ${event.price}`}</p>
                        <Button variant={selected ? 'default' : 'outline'} disabled={!isAvailable} onClick={(e) => { e.stopPropagation(); if (isAvailable) setBookingSelection({ id: event.id, type: 'event' }); }}>
                          {!isAvailable ? 'Coming Soon' : selected ? 'Selected' : 'Select Event'}
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
                <CardTitle className="text-3xl">{selectedOffering ? 'Book Experience' : 'Select an Event or Activity'}</CardTitle>
                {selectedOffering && <CardDescription>{selectedOffering.title}</CardDescription>}
              </CardHeader>
              <CardContent>
                {selectedOffering ? (
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
                      <label className="mb-2 block text-sm font-semibold">Number of Participants</label>
                      <Input required type="number" min="1" max={selectedAvailableSpots !== null ? String(selectedAvailableSpots) : undefined} value={formData.participants} onChange={(e) => setFormData({ ...formData, participants: e.target.value })} />
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
                  <p className="py-8 text-center text-sm leading-7 text-muted-foreground">Click an event or activity card to start a booking request.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
