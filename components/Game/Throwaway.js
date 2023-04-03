import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gameActions } from "@/store/slices/gameSlice";
import { supabase } from "@/lib/supabase";
import Router from "next/router";
import styles from "./EndModal.module.css";

const Throwaway = (props) => {
  const dispatch = useDispatch();
  const player2Deck = useSelector((state) => {
    return state.game.player2Deck;
  });

  const player1 = useSelector((state) => {
    return state.game.player1;
  });

  const player2 = useSelector((state) => {
    return state.game.player2;
  });
  const health1 = useSelector((state) => {
    return state.game.player1HP;
  });

  const health2 = useSelector((state) => {
    return state.game.player2HP;
  });

  const winner = useSelector((state) => {
    return state.game.winner;
  });
  const ended = useSelector((state) => {
    return state.game.ended;
  });

  useEffect(() => {
    console.log("END GAME USE EFFECT BEFORE THE IF STATEMENT");
    if (ended) {
      console.log("THE GAME HAS ENDED INSIDE IF STATEMENT");

      const setEndState = () => {
        console.log("SET END STATE FUNCTION");
        if (health1 > health2) {
          console.log("PLAYER1", player1);
          dispatch(gameActions.setWinner(player1.id));
          dispatch(gameActions.setWinnerUsername(player1.username));
          dispatch(gameActions.setLoser(player2));
          console.log("setting loser", player2);
        } else if (health2 > health1) {
          console.log("PLAYER2", player2);
          dispatch(gameActions.setWinner(player2.id));
          dispatch(gameActions.setWinnerUsername(player2.username));
          console.log("setting loser", player1);
          dispatch(gameActions.setLoser(player1));
        }
      };

      setEndState();

      console.log("game winner", winner);

      const updateGameHistory = async () => {
        if (health1 === health2) {
          try {
            await supabase
              .from("game")
              .update({ isDraw: true })
              .eq("id", Router.query.id);
            await supabase
              .from("game")
              .update({ isComplete: true })
              .eq("id", Router.query.id);
          } catch (error) {
            console.log("error in update game history", error);
          }
        } else {
          if (winner) {
            try {
              await supabase
                .from("game")
                .update({ winner: winner })
                .eq("id", Router.query.id);
              await supabase
                .from("game")
                .update({ isComplete: true })
                .eq("id", Router.query.id);
            } catch (error) {
              console.log("error in update game history", error);
            }
            const { data } = await supabase
              .from("users")
              .select("wallet")
              .eq("id", winner)
              .single();
            const walletUpdate = data.wallet + 3;
            const updateWallet = async () => {
              try {
                await supabase
                  .from("users")
                  .update({ wallet: walletUpdate })
                  .eq("id", winner);
              } catch (error) {
                console.log("error updating winner wallet", error);
              }
            };
            updateWallet();
          }
        }
      };
      updateGameHistory();
    }
  }, [ended, winner]);

  return <div className={styles.throwaway}></div>;
};

export default Throwaway;
