import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const GameOver = () => {
  const player1 = useSelector((state) => {
    return state.game.player1;
  });

  const player2 = useSelector((state) => {
    return state.game.player2;
  });
};

export default GameOver;
