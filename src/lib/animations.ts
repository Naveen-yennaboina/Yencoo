import { Variants } from "framer-motion";

// Standard elegant spring physics for interactions
export const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

// Smooth easing for transitions
export const easeInOut = [0.4, 0, 0.2, 1];
export const easeOut = [0, 0, 0.2, 1];

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3, ease: easeOut } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: easeInOut } },
};

export const slideUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: easeInOut } },
};

export const slideDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3, ease: easeInOut } },
};

export const slideInRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easeOut } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: easeInOut } },
};

export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easeOut } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.3, ease: easeInOut } },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: easeOut } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: easeInOut } },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
};
