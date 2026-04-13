'use client';

import Link from 'next/link';
import { useState } from 'react';
import { DiamondMinus, DiamondPlus, Menu, X } from 'lucide-react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    {
      href: '/products',
      label: 'Products',
      children: [
        { href: '/products/fruits', label: 'Fruits' },
        { href: '/products/vegetables', label: 'Vegetables' },
        { href: '/products/food-and-beverage', label: 'Food & Beverage' },
        { href: '/products/agri-products', label: 'Agri-products' },
        { href: '/products/nursery', label: 'Nursery' },
        { href: '/products/livestock', label: 'Livestock' },
      ],
    },
    {
      href: '/experience',
      label: 'Experience',
      children: [
        { href: '/pollinights', label: 'PolliNights' },
        { href: '/pick-and-pay', label: 'Pick & Pay' },
        { href: '/events', label: 'Events and Activities' },
      ],
    },
    {
      href: '/membership',
      label: 'Membership',
      children: [
        { href: '/membership#little-pollinators', label: 'Little Pollinators' },
        { href: '/membership#senior-pollinators', label: 'Senior Pollinators' },
        { href: '/membership#harvesters', label: 'Harvesters' },
        { href: '/membership#beekeepers', label: 'Beekeepers' },
      ],
    },
    {
      href: '/learn',
      label: 'Learn',
      children: [
        { href: '/learn/be-a-student-farmer', label: 'Be a Student Farmer' },
        { href: '/learn/tesda-courses', label: 'TESDA Courses' },
      ],
    },
    {
      href: '/stay',
      label: 'Stay',
      children: [
        { href: '/stay/book-a-treehouse', label: 'Book a Treehouse' },
        { href: '/stay/invest-in-a-residential-resort', label: 'Invest in a Residential Resort' },
      ],
    },
    /** { href: '/blog', label: 'Blog' }, **/
    { href: '/contact', label: 'Contact Us' },
  ];

  return (
    <nav className="sticky top-0 z-40 border-b border-white/45 bg-background/80 backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="section-shell">
        <div className="relative flex min-h-20 items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/85 shadow-[0_10px_24px_rgba(33,74,52,0.10)]">
              <img src="/logo.png" alt="HDN Integrated Farm Logo" className="h-9 w-9 object-contain" />
            </div>
            <div>
              <p className="font-display text-2xl font-semibold leading-none text-primary">HDN</p>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-muted-foreground">Integrated Farm</p>
            </div>
          </Link>

          <div className="ml-auto hidden w-fit max-w-full flex-none items-center justify-end gap-1 rounded-full border border-white/60 bg-white/65 p-1.5 shadow-[0_12px_28px_rgba(33,74,52,0.08)] md:flex">
            {navItems.map((item) => (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="block whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold text-foreground/80 transition hover:bg-primary hover:text-primary-foreground"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pointer-events-none absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-2 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                    <div className="rounded-3xl border border-white/70 bg-white/92 p-2 shadow-[0_16px_36px_rgba(33,74,52,0.16)] backdrop-blur-md">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-2xl px-4 py-2.5 text-sm font-semibold text-foreground/85 transition hover:bg-primary hover:text-primary-foreground"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-full border border-white/65 bg-white/80 p-3 shadow-[0_10px_24px_rgba(33,74,52,0.08)] hover:bg-white md:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="pb-5 md:hidden">
            <div className="glass-panel space-y-2 p-3">
              {navItems.map((item) => (
                <div key={item.href} className="rounded-2xl border border-white/60 bg-white/75 p-2">
                  <Link
                    href={item.href}
                    className="block rounded-xl px-3 py-2 text-base font-semibold text-foreground/85 transition hover:bg-primary hover:text-primary-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="mt-1 space-y-1 border-t border-white/60 pt-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-primary hover:text-primary-foreground"
                          onClick={() => setIsOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-white/45 bg-white/80 py-2.5 backdrop-blur-xl">
        <div className="section-shell flex flex-wrap items-center justify-between gap-4 text-sm text-foreground/85">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold">Legend:</span>
            <span className="inline-flex items-center gap-2">
              <DiamondPlus size={14} className="text-primary" />
              Available
            </span>
            <span className="inline-flex items-center gap-2">
              <DiamondMinus size={14} className="text-muted-foreground" />
              Coming soon
            </span>
          </div>
          <p className="max-w-3xl text-xs leading-5 text-muted-foreground md:text-sm">
            Please note: Images of unreleased products or experiences are conceptual visualizations, not actual photographs.
          </p>
        </div>
      </div>
    </nav>
  );
}
