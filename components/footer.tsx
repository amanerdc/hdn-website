'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { farmInfo as fallbackFarmInfo, type FarmInfo } from '@/lib/farm-data';

export function Footer() {
  const [farmInfo, setFarmInfo] = useState<FarmInfo>(fallbackFarmInfo);

  useEffect(() => {
    let isMounted = true;

    fetch('/api/public/farm-info', { cache: 'no-store' })
      .then((response) => response.json())
      .then((payload) => {
        if (isMounted && payload?.farmInfo) {
          setFarmInfo(payload.farmInfo);
        }
      })
      .catch(() => undefined);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(180deg,#1f5a3d_0%,#143525_100%)] text-primary-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(142,214,170,0.22),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)]" />
      <div className="section-shell relative py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <img src="/logo.png" alt="HDN Integrated Farm Logo" className="h-10 w-10 object-contain" />
              </div>
              <div>
                <h3 className="font-display text-1xl font-semibold">{farmInfo.name}</h3>
                <p className="text-xs uppercase tracking-[0.20em] text-primary-foreground/65">Farm fresh lifestyle</p>
              </div>
            </div>
            <p className="text-sm leading-7 text-primary-foreground/82">{farmInfo.description}</p>
          </div>

          <div>
            <h4 className="mb-4 font-display text-2xl font-semibold">Explore</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/82">
              <li><Link href="/products" className="transition hover:text-white">Products</Link></li>
              <li><Link href="/pollinights" className="transition hover:text-white">PolliNights</Link></li>
              <li><Link href="/pick-and-pay" className="transition hover:text-white">Pick & Pay</Link></li>
              <li><Link href="/events" className="transition hover:text-white">Events</Link></li>
              <li><Link href="/blog" className="transition hover:text-white">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display text-2xl font-semibold">Visit</h4>
            <div className="space-y-4 text-sm text-primary-foreground/82">
              <div className="flex items-start space-x-3"><MapPin size={16} className="mt-1 flex-shrink-0 text-secondary" /><span>{farmInfo.location}</span></div>
              <div className="flex items-center space-x-3"><Phone size={16} className="text-secondary" /><span>{farmInfo.phone}</span></div>
              <div className="flex items-center space-x-3"><Mail size={16} className="text-secondary" /><span>{farmInfo.email}</span></div>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-display text-2xl font-semibold">Connect</h4>
            <p className="mb-5 text-sm leading-7 text-primary-foreground/82">Stay close to harvest updates, seasonal offers, and community activities from the farm.</p>
            <div className="flex space-x-3">
              <a href={farmInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 transition hover:-translate-y-0.5 hover:bg-white/16"><Facebook size={20} /></a>
              <a href={farmInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 transition hover:-translate-y-0.5 hover:bg-white/16"><Instagram size={20} /></a>
              <a href={farmInfo.socialMedia.tiktok} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 transition hover:-translate-y-0.5 hover:bg-white/16" aria-label="Visit our TikTok page">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.12v13.18a2.67 2.67 0 1 1-2.67-2.67c.23 0 .46.03.67.09V9.42a5.79 5.79 0 0 0-.67-.04A5.79 5.79 0 1 0 15.82 15V8.34a7.9 7.9 0 0 0 4.62 1.48V6.69h-.85Z" /></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/12 pt-6 text-center text-sm text-primary-foreground/65">
          <p>&copy; {new Date().getFullYear()} HDN Integrated Farm. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
