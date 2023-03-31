import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Router from "next/router";
import { useEffect } from "react";
const Player2HP = (props) => {
  // const router = useRouter();
  const health = useSelector((state) => {
    return state.game.player2HP;
  });

  useEffect(() => {
    setInterval(() => {
      if (health <= 0) {
        Router.push("/");
      }
    }, 1000);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="player2-hp"
    >
      {props?.player2?.username} HP: {health}
    </motion.div>
  );
};

export default Player2HP;
