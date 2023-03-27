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
  const [data, setData] = useState();
  const [presences, setPresences] = useState([]);
  const [opponentHP, setOpponentHP] = useState(15);
  const [myHp, setMyHP] = useState(15);
  const [opponentDeck, setOpponentDeck] = useState([]);
  const [opponentInfo, setOpponentInfo] = useState({});
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user.user;
  });

  const userDeck = useSelector((state) => {
    return state.deck;
  });

  //fetches users deck
  useEffect(() => {
    dispatch(fetchDeckCards(user.id));
  }, []);

  //establishes presence
  useEffect(() => {
    const channel = supabase.channel("game1");

    channel
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          const trackStatus = await channel.track();
          // console.log(trackStatus, "TRACKSTATUS");
        }
      })
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        // console.log(state, "CHANNEL STATE");
        channel.send({
          type: "broadcast",
          event: "getUserDeck",
          payload: { data: { user, userDeck } },
        });
      })
      .on("presence", { event: "join" }, (object) => {
        setPresences((presences) => [...presences, object]);
        // console.log("User has joined");
      })
      .on("presence", { event: "leave" }, (object) => {});
  }, []);

  useEffect(() => {
    supabase
      .channel("game1")
      .on("broadcast", { event: "getUserDeck" }, (payload) => {
        console.log(payload, "payload");
        setOpponentDeck((opponentDeck) => payload.payload?.data?.userDeck);
        setOpponentInfo((opponentInfo) => payload.payload.data?.user);
      });
  });

  const receiveData = () => {
    console.log(presences);
    console.log(opponentDeck, "opp DECK");
    console.log(opponentInfo, "OPP INFO");
  };

  return (
    //window container
    <>
      <button onClick={receiveData}>Receive</button>
      <GameContainer>
        {userDeck &&
          userDeck.map((card, i) => {
            return <Card key={uuidv4()} zIndex={i - 1} card={card} />;
          })}
        {opponentDeck &&
          opponentDeck.length > 0 &&
          opponentDeck.map((card, i) => {
            return <OpponentCard key={uuidv4()} zIndex={i - 1} card={card} />;
          })}
        <Player1HP user={user} />
        <Player2HP opp={opponentInfo} />
      </GameContainer>
    </>
  );
};

export default GameComponent;
