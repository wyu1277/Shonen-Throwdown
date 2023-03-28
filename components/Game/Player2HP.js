import { motion } from "framer-motion";

const Player2HP = ({ opp }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="player2-hp"
    >
      {opp.username} HP
    </motion.div>
  );
};

export default Player2HP;
