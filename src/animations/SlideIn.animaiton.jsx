export const slideIn = {
  initial: {
    x: "100%",
  },
  open: {
    x: 0,
    transition: {
      duration: 0.4,
      type: "tween",
      delayChildren: 0.2,
      staggerChildren: 0.08,
    },
  },
};

export const slideInFade = {
  initial: {
    x: "100%",
    opacity: 0,
  },
  open: {
    x: 0,
    opacity: 1,
  },
};
