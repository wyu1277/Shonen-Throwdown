import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import { useEffect } from "react";

const Player2HP = (props) => {
  const dispatch = useDispatch();
  console.log(props, "PLAYER2 PROPS");
  // const router = useRouter();
  const health = useSelector((state) => {
    return state.game.player2HP;
  });

  useEffect(() => {
    health <= 0 && dispatch(gameActions.endGame(true));
  }, [health]);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="player2-hp"
    >
      {props?.opp} HP: {health}
    </motion.div>
  );
};

export default Player2HP;
