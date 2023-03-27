import { motion } from "framer-motion";

const Player1HP = () => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="player1-hp"
    >
      Player1 HP
    </motion.div>
  );
};

export default Player1HP;
