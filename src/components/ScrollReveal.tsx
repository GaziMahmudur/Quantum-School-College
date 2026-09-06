import React, { useEffect, useRef, useState, ReactNode, useContext } from 'react';
import { AnimationContext } from '../AnimationContext';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'none';
  delay?: number;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, className = '', direction = 'up', delay = 0, once = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);
  const { animationsEnabled } = useContext(AnimationContext);

  useEffect(() => {
    const el = domRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Defer state write to next paint frame to avoid forced reflow
          requestAnimationFrame(() => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              if (once) observer.unobserve(el);
            } else if (!once) {
              setIsVisible(false);
            }
          });
        });
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1,
      }
    );

    observer.observe(el);

    // Use disconnect() to fully clean up the observer instance
    return () => observer.disconnect();
  }, [once, animationsEnabled]);

  if (!animationsEnabled) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  // Determine initial transform based on direction
  let initialTransform = '';
  if (direction === 'up') initialTransform = 'translate-y-12';
  if (direction === 'left') initialTransform = '-translate-x-12';
  if (direction === 'right') initialTransform = 'translate-x-12';

  return (
    <div
      ref={domRef}
      className={`scroll-reveal-el transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 ${initialTransform}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
