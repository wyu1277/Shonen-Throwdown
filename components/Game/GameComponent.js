import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Card from "./Card";
import OpponentCard from "./OpponentCard";
import GameContainer from "./GameContainer";
import Player1HP from "./Player1HP";
import Player2HP from "./Player2HP";
import { supabase } from "@/lib/supabase";
import { fetchDeckCards } from "@/store/slices/deckSlice";
import { v4 as uuidv4 } from "uuid";

const GameComponent = () => {
  const dispatch = useDispatch();
  const [deckIDs, setDeckIDs] = useState();
  const [deck, setDeck] = useState();
  const [zIndex, setZIndex] = useState(0);

  const user = useSelector((state) => {
    return state.user.user;
  });

  const userDeck = useSelector((state) => {
    return state.deck;
  });

  //   const cards = () => {
  //     let cards = [];
  //     for (let i = 0; i < deck.length; i++) {
  //       return;
  //     }
  //   };

  useEffect(() => {
    // const getDeck = async () => {
    //   const { data } = await supabase
    //     .from("decks")
    //     .select("*")
    //     .eq("user_id", user.id);
    //   setDeckIDs(data);
    // };
    // getDeck();
    dispatch(fetchDeckCards(user.id));
  }, []);

  console.log(userDeck);

  return (
    //window container

    <GameContainer>
      {userDeck &&
        userDeck.map((card) => {
          return <Card key={uuidv4()} card={card} />;
        })}
      <OpponentCard />
      <Player1HP />
      <Player2HP />
    </GameContainer>
  );
};

export default GameComponent;
