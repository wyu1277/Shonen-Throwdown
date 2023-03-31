import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import { gameActions } from "@/store/slices/gameSlice";
import { loadActions } from "@/store/slices/loadSlice";

const Player1HP = (props) => {
  const dispatch = useDispatch();
  // const router = useRouter;
  // const [health, setHealth] = useState(props.myHP);
  const player1 = useSelector((state) => {
    return state.game.player1;
  });
  const player2 = useSelector((state) => {
    return state.game.player2;
  });

  const ended = useSelector((state) => {
    return state.game.ended;
  });

  const health1 = useSelector((state) => {
    return state.game.player1HP;
  });

  const health2 = useSelector((state) => {
    return state.game.playerHP;
  });

  useEffect(() => {
    if (ended) {
      if (health1 > health2) {
        dispatch(gameActions.setWinner(player1.id));
        dispatch(gameActions.setLoser(player2.id));
      } else if (health2 > health1) {
        dispatch(gameActions.setWinner(player2.id));
        dispatch(gameActions.setLoser(player1.id));
      }
    }
  }, [ended]);

  useEffect(() => {
    health1 <= 0 && dispatch(gameActions.endGame(true));
    health1 <= 0 && dispatch(loadActions.setLoading(true));
  }, [health1]);
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="player1-hp"
    >
      {props.user?.username} HP: {health1}
    </motion.div>
  );
};

export default Player1HP;
