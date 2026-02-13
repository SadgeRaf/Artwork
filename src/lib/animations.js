"use client"

import gsap from 'gsap';

// Fade in from bottom
export const fadeInUp = (element, delay = 0) => {
  gsap.fromTo(
    element,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, delay, ease: 'power2.out' }
  );
};

// Fade in from left
export const fadeInLeft = (element, delay = 0) => {
  gsap.fromTo(
    element,
    { opacity: 0, x: -30 },
    { opacity: 1, x: 0, duration: 0.6, delay, ease: 'power2.out' }
  );
};

// Fade in from right
export const fadeInRight = (element, delay = 0) => {
  gsap.fromTo(
    element,
    { opacity: 0, x: 30 },
    { opacity: 1, x: 0, duration: 0.6, delay, ease: 'power2.out' }
  );
};

// Scale in
export const scaleIn = (element, delay = 0) => {
  gsap.fromTo(
    element,
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration: 0.5, delay, ease: 'back.out(1.2)' }
  );
};

// Stagger children animation
export const staggerChildren = (parent, childSelector, delay = 0) => {
  const children = parent.querySelectorAll(childSelector);
  gsap.fromTo(
    children,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      delay,
      ease: 'power2.out'
    }
  );
};

// Hover scale effect
export const hoverScale = (element) => {
  element.addEventListener('mouseenter', () => {
    gsap.to(element, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
  });
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, { scale: 1, duration: 0.3, ease: 'power2.out' });
  });
};
