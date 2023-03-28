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
import { useRef } from "react";

const GameComponent = () => {
  const buttonRef = useRef();
  const divRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [presences, setPresences] = useState([]);
  const [opponentHP, setOpponentHP] = useState(15);
  const [opponentDeck, setOpponentDeck] = useState([]);
  const [opponentInfo, setOpponentInfo] = useState({});
  const dispatch = useDispatch();
  const audioRef = useRef(null);

  setInterval(() => {
    divRef?.current?.click();
  }, 5000);
  const user = useSelector((state) => {
    return state.user.user;
  });

  const userDeck = useSelector((state) => {
    return state.deck;
  });

  const clickDiv = () => {
    divRef.current.click();
  };

  //fetches users deck
  useEffect(() => {
    setLoading(true);
    dispatch(fetchDeckCards(user.id));
    setLoading(false);
  }, [loading]);

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
    audioRef.current.play();

    supabase
      .channel("game1")
      .on("broadcast", { event: "getUserDeck" }, (payload) => {
        console.log(payload, "payload");
        setLoading(true);
        setOpponentDeck((opponentDeck) => payload.payload?.data?.userDeck);
        setOpponentInfo((opponentInfo) => payload.payload.data?.user);
        setLoading(false);
      });
  }, [loading]);

  const receiveData = () => {
    console.log(presences);
    console.log(opponentDeck, "opp DECK");
    console.log(opponentInfo, "OPP INFO");
    setOpponentHP((opponentHP) => (opponentHP += 1));
  };

  return (
    //window container
    <>
      <audio src="/audio/music.mp3" ref={audioRef} />
      <button onClick={receiveData} ref={buttonRef}>
        {opponentHP}
      </button>
      <GameContainer>
        <div className="player-div" ref={divRef}></div>

        {userDeck &&
          userDeck.map((card, i) => {
            return <Card key={uuidv4()} zIndex={i - 1} card={card} />;
          })}
        {opponentDeck &&
          opponentDeck.length > 0 &&
          opponentDeck.map((card, i) => {
            return (
              <div key={uuidv4()} ref={divRef}>
                <OpponentCard key={uuidv4()} zIndex={i - 1} card={card} />
              </div>
            );
          })}

        <Player1HP user={user} />
        <Player2HP opp={opponentInfo} />
        <div className="click-ref">ClickRef</div>
      </GameContainer>
    </>
  );
};

export default GameComponent;
