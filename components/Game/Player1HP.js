import { motion } from "framer-motion";

const Player1HP = ({ user }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="player1-hp"
    >
      {user.username} HP
    </motion.div>
  );
};

export default Player1HP;
