import { motion } from "framer-motion";

const GameContainer = (props) => {
  return (
    <motion.div
      initial={{
        scale: 0,
        width: 200,
        height: 200,
        borderRadius: "50%",
        opacity: 0,
      }}
      animate={{
        scale: 1,
        borderRadius: "2%",
        height: "95vh",
        width: "95vw",
        opacity: 0.3,
      }}
      transition={{ duration: 1.5 }}
      className="game-box"
    >
      {props.children}
    </motion.div>
  );
};

export default GameContainer;
