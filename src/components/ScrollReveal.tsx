import React, { useEffect, useRef, useState, ReactNode } from 'react';

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // If once is true, unobserve after it becomes visible
            if (once && domRef.current) {
              observer.unobserve(domRef.current);
            }
          } else if (!once) {
            // If once is false, hide it when it leaves the viewport so it can animate again
            setIsVisible(false);
          }
        });
      },
      {
        rootMargin: '0px 0px -10% 0px', // Wait until it's slightly inside the viewport bottom
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, []);

  // Determine initial transform based on direction
  let initialTransform = '';
  if (direction === 'up') initialTransform = 'translate-y-12';
  if (direction === 'left') initialTransform = '-translate-x-12';
  if (direction === 'right') initialTransform = 'translate-x-12';

  return (
    <div
      ref={domRef}
      className={`transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 ${initialTransform}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
