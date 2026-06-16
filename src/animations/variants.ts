/**
 * Fox Studio — Framer Motion animation presets.
 * Premium, cinematic, slow, intentional.
 */

// Custom easing — smooth luxury feel
const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
const easeSlow: [number, number, number, number] = [0.43, 0.13, 0.23, 0.96];

// ─── Fade In Up (most common) ────────────────────────────
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

// ─── Fade In ─────────────────────────────────────────────
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease },
  },
};

// ─── Scale In ────────────────────────────────────────────
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease },
  },
};

// ─── Stagger Container ──────────────────────────────────
export const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerSlow = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// ─── Slide From Left ─────────────────────────────────────
export const slideFromLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: easeSlow },
  },
};

// ─── Slide From Right ────────────────────────────────────
export const slideFromRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: easeSlow },
  },
};

// ─── Page Transition ─────────────────────────────────────
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease },
  },
};

// ─── Hero Text Reveal ────────────────────────────────────
export const heroReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: easeSlow },
  },
};

// ─── Image Hover ─────────────────────────────────────────
export const imageHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: { duration: 0.4, ease },
  },
};

// ─── Card Hover ──────────────────────────────────────────
export const cardHover = {
  rest: { y: 0 },
  hover: {
    y: -4,
    transition: { duration: 0.3, ease },
  },
};
