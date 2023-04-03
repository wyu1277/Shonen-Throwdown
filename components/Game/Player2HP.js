"use client";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { gameActions } from "@/store/slices/gameSlice";
import { loadActions } from "@/store/slices/loadSlice";

const Player2HP = (props) => {
  const dispatch = useDispatch();

  const health2 = useSelector((state) => {
    return state.game.player2HP;
  });

  const player2 = useSelector((state) => {
    return state.game.player2;
  });

  useEffect(() => {
    health2 <= 0 && dispatch(gameActions.endGame(true));
    health2 <= 0 && dispatch(loadActions.setLoading(true));
  }, [health2]);

  return (
    <motion.div
      initial={{ scale: 0, backgroundColor: "#220901" }}
      animate={{
        scale: 1,
        backgroundColor: ["white", "red", "black"],
        fontWeight: "bold",
        opacity: 1,
      }}
      className="player2-hp"
    >
      {player2.username} HP: {health2}
    </motion.div>
  );
};

export default Player2HP;
