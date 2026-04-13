'use client';

import { useEffect } from 'react';

export function ScrollRevealInit() {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('.motion-fade-up, .reveal-children')
    );

    if (targets.length === 0) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            element.classList.add('is-visible');
            observer.unobserve(element);
          }
        });
      },
      {
        threshold: 0.24,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
