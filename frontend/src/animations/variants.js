// Minimal, elegant motion variants (Linear/Vercel style)

export const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.02,
    },
  },
};

export const transition = {
  duration: 0.4,
  ease: [0.2, 0, 0, 1], // Custom smooth easing
};

export const transitionSlow = {
  duration: 0.7,
  ease: [0.2, 0, 0, 1],
};
