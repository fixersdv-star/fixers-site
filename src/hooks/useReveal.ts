import { useEffect, useRef } from 'react';

/**
 * Inner pages: every `.reveal` element fades/slides in with an 80ms stagger
 * right after mount. Also scrolls the window to the top on page change.
 */
export function useStaggerReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const timers: number[] = [];
    ref.current.querySelectorAll<HTMLElement>('.reveal').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      timers.push(
        window.setTimeout(() => {
          el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, i * 80),
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return ref;
}

/**
 * Home page: `.reveal` elements animate in when they scroll into view
 * (IntersectionObserver, 10% threshold, 0.8s ease).
 */
export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 },
    );
    els.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return ref;
}
