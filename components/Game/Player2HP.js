import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const Player2HP = (props) => {
  const health = useSelector((state) => {
    return state.game.player2HP;
  });
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="player2-hp"
    >
      {props?.opp?.username} HP: {health}
    </motion.div>
  );
};

export default Player2HP;
