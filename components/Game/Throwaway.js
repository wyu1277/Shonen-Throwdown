import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gameActions } from "@/store/slices/gameSlice";
import { loadActions } from "@/store/slices/loadSlice";

const Throwaway = (props) => {
  const player2Deck = useSelector((state) => {
    return state.game.player2Deck;
  });

  const player2 = useSelector((state) => {
    return state.game.player2;
  });
  //   const player2 = props.player2info;
  //   const player2Deck = props.player2Deck;
  useEffect(() => {
    setInterval(() => {
      console.log(player2);
      console.log(player2Deck);
    }, 1000);
  }, []);

  return <div>Hi</div>;
};

export default Throwaway;
