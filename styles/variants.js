export const backDrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const container = {
  initial: { x: -3000 },
  visible: { x: 0, transition: { duration: 1 } },
  exit: { x: -2000, transition: { duration: 0.5 } },
};

export default container;
