"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import { gameActions } from "@/store/slices/gameSlice";
import { loadActions } from "@/store/slices/loadSlice";
import { supabase } from "@/lib/supabase";

const Player1HP = (props) => {
  const dispatch = useDispatch();

  const health1 = useSelector((state) => {
    return state.game.player1HP;
  });
  const player1 = useSelector((state) => {
    return state.game.player1;
  });

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
      {player1.username} HP: {health1}
    </motion.div>
  );
};

export default Player1HP;
