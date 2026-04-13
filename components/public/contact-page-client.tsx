'use client';

import React, { useState } from 'react';
import { Facebook, Instagram, Mail, MapPin, Phone, Send } from 'lucide-react';
import { type FarmInfo } from '@/lib/farm-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type ContactPageClientProps = {
  farmInfo: FarmInfo;
};

export function ContactPageClient({ farmInfo }: ContactPageClientProps) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setTimeout(() => {
          setSubmitStatus('idle');
          setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        }, 10000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 10000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-band-tinted">
      <div className="section-shell">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-8">
                <h2 className="text-3xl font-semibold text-foreground">Get in touch</h2>
                <div className="mt-6 space-y-5 text-sm">
                  <div className="flex items-start gap-3"><MapPin size={18} className="mt-1 text-primary" /><span className="leading-7 text-muted-foreground">{farmInfo.location}</span></div>
                  <div className="flex items-center gap-3"><Phone size={18} className="text-primary" /><a href={`tel:${farmInfo.phone}`} className="leading-7 text-muted-foreground hover:text-primary">{farmInfo.phone}</a></div>
                  <div className="flex items-center gap-3"><Mail size={18} className="text-primary" /><a href={`mailto:${farmInfo.email}`} className="leading-7 text-muted-foreground hover:text-primary">{farmInfo.email}</a></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-8">
                <h3 className="text-2xl font-semibold text-foreground">Follow Us</h3>
                <div className="mt-6 flex gap-3">
                  <a href={farmInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/12 bg-white/80 text-primary transition hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"><Facebook size={18} /></a>
                  <a href={farmInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/12 bg-white/80 text-primary transition hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"><Instagram size={18} /></a>
                  <a href={farmInfo.socialMedia.tiktok} target="_blank" rel="noopener noreferrer" aria-label="Visit our TikTok page" className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/12 bg-white/80 text-primary transition hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground">
                    <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.12v13.18a2.67 2.67 0 1 1-2.67-2.67c.23 0 .46.03.67.09V9.42a5.79 5.79 0 0 0-.67-.04A5.79 5.79 0 1 0 15.82 15V8.34a7.9 7.9 0 0 0 4.62 1.48V6.69h-.85Z" /></svg>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader><CardTitle className="text-3xl">Send us a Message</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div><label className="mb-2 block text-sm font-semibold text-foreground">Full Name</label><Input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your name" /></div>
                  <div><label className="mb-2 block text-sm font-semibold text-foreground">Email</label><Input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com" /></div>
                </div>
                <div><label className="mb-2 block text-sm font-semibold text-foreground">Phone (Optional)</label><Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="09..." /></div>
                <div><label className="mb-2 block text-sm font-semibold text-foreground">Subject</label><Input required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} placeholder="What is this about?" /></div>
                <div><label className="mb-2 block text-sm font-semibold text-foreground">Message</label><Textarea required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us more about your inquiry..." rows={6} /></div>
                {submitStatus === 'success' && <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">Thank you! We&apos;ll get back to you soon.</div>}
                {submitStatus === 'error' && <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">Sorry, there was an error sending your message. Please try again.</div>}
                <Button type="submit" disabled={isSubmitting} className="w-full"><Send size={18} className="mr-1" />{isSubmitting ? 'Sending...' : 'Send Message'}</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
