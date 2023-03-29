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
import { gameActions } from "@/store/slices/gameSlice";
import { useRouter } from "next/router";

let oppCard = null;
let myCard = null;
let myHP = 15;
let oppHP = 15;

const GameComponent = () => {
  const router = useRouter();
  const [playAudio, setPlayAudio] = useState(true);
  const cardRefs = useRef(new Array());
  const buttonRef = useRef();
  const divRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [presences, setPresences] = useState([]);
  // const [opponentHP, setOpponentHP] = useState(15);
  // const [myHP, setMyHP] = useState(15);
  const [opponentDeck, setOpponentDeck] = useState([]);
  const [opponentInfo, setOpponentInfo] = useState({});
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const [set, setShowSet] = useState(false);

  // const player1HP = useSelector((state) => {
  //   return state.game.player1HP;
  // });

  // const player2HP = useSelector((state) => {
  //   return state.game.player2HP;
  // });

  const user = useSelector((state) => {
    return state.user.user;
  });

  const userDeck = useSelector((state) => {
    return state.deck;
  });

  const checks = () => {
    if (myCard && oppCard) {
      if (myCard.power === oppCard.power) {
        const damage = myCard.power - oppCard.power;
        myCard = null;
        oppCard = null;
      } else if (myCard.power > oppCard.power) {
        const damage = myCard.power - oppCard.power;
        oppHP = oppHP - damage;
        dispatch(gameActions.decreasePlayer2HP(damage));
        // console.log(damage);
        myCard = null;
        oppCard = null;
      } else if (myCard.power < oppCard.power) {
        const damage = oppCard.power - myCard.power;
        dispatch(gameActions.decreasePlayer1HP(damage));
        myHP = myHP - damage;
        // console.log(damage);
        myCard = null;
        oppCard = null;
      }

      // if (player1HP <= 0 || player2HP <= 0) {
      //   router.push("/");
      // }
    }
  };

  useEffect(() => {
    setInterval(() => {
      checks();
    }, 1000);
  }, []);

  //fetches users deck
  // useEffect(() => {
  //   sif (oppCard && myCard) {
  //     checks();
  //   }
  // }, []);

  //establishes presence
  useEffect(() => {
    const channel = supabase.channel("game1");

    channel
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          const trackStatus = await channel.track();
        }
      })
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        channel.send({
          type: "broadcast",
          event: "getUserDeck",
          payload: { data: { user, userDeck } },
        });
      })
      .on("presence", { event: "join" }, (object) => {
        setPresences((presences) => [...presences, object]);
      })
      .on("presence", { event: "leave" }, (object) => {});
  }, []);

  useEffect(() => {
    // audioRef.current.play();

    supabase
      .channel("game1")
      .on("broadcast", { event: "getUserDeck" }, (payload) => {
        setLoading(true);
        setOpponentDeck((opponentDeck) => payload.payload?.data?.userDeck);
        setOpponentInfo((opponentInfo) => payload.payload.data?.user);
        setLoading(false);
      })
      .on("broadcast", { event: "cardmove" }, (payload) => {
        // console.log(cardRefs?.current);
        // console.log(payload.payload);
        cardRefs?.current[payload.payload.data.index - 1]?.click();
        oppCard = payload.payload.data.cardInfo;
        // checks();
      })
      .on("broadcast", { event: "cardmove" }, () => {
        // checks();
      });
  }, [user]);

  const receiveData = () => {
    // if (myCard && oppCard) {
    //   if (myCard.power === oppCard.power) {
    //     const damage = myCard.power - oppCard.power;
    //     myCard = null;
    //     oppCard = null;
    //   }

    //   if (myCard.power > oppCard.power) {
    //     const damage = myCard.power - oppCard.power;
    //     oppHP = oppHP - damage;
    //     dispatch(gameActions.decreasePlayer2HP(damage));
    //     // console.log(damage);
    //     myCard = null;
    //     oppCard = null;
    //   }

    //   if (myCard.power < oppCard.power) {
    //     const damage = oppCard.power - myCard.power;
    //     dispatch(gameActions.decreasePlayer1HP(damage));
    //     myHP = myHP - damage;
    //     // console.log(damage);
    //     myCard = null;
    //     oppCard = null;
    //   }
    // }
    // dispatch(gameActions.decreasePlayer1HP(1));
    setShowSet(!set);
    console.log(myCard);
    console.log(oppCard);
  };

  const setMyCard = (card) => {
    myCard = card;
  };

  return (
    //window container
    <>
      {/* <button onClick={}>Music</button> */}
      <audio src="/audio/music.mp3" ref={audioRef} />
      {set && (
        <button onClick={receiveData} ref={buttonRef}>
          Set!
        </button>
      )}
      <GameContainer>
        {userDeck &&
          userDeck.map((card, i) => {
            return (
              <Card
                setShowSet={setShowSet}
                checks={checks}
                key={uuidv4()}
                setMyCard={setMyCard}
                index={i + 1}
                zIndex={i - 1}
                card={card}
              />
            );
          })}
        {opponentDeck &&
          opponentDeck.length > 0 &&
          opponentDeck.map((card, i) => {
            return (
              <OpponentCard
                key={uuidv4()}
                zIndex={i + 1}
                card={card}
                ref={(el) => (cardRefs.current[i] = el)}
              />
            );
          })}

        <Player1HP user={user} myHP={myHP} />
        <Player2HP opp={opponentInfo} opponentHP={oppHP} />
      </GameContainer>
    </>
  );
};

export default GameComponent;
