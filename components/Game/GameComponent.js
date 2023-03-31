import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Card from "./Card";
import OpponentCard from "./OpponentCard";
import GameContainer from "./GameContainer";
import Player1HP from "./Player1HP";
import Player2HP from "./Player2HP";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";
import { gameActions } from "@/store/slices/gameSlice";
import Router from "next/router";

let oppCard = {
  image: "https://i.imgur.com/RCATsQ2.png",
  power: 1,
  element: "Green",
};
let myCard = null;
let myCardPos = null;
let oppCardPos = 1;

let taps = 0;

const GameComponent = (props) => {
  const myRef = useRef(null);
  // const [taps, setTaps] = useState(0);
  const [playAudio, setPlayAudio] = useState(true);
  const cardRefs = useRef(new Array());
  const myCardRefs = useRef(new Array());
  const buttonRef = useRef();
  const divRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [presences, setPresences] = useState([]);

  const [opponentDeck, setOpponentDeck] = useState([]);
  const [opponentInfo, setOpponentInfo] = useState({});
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const [set, setShowSet] = useState(false);

  const channels = Router.query.id;

  const user = useSelector((state) => {
    return state.user.user;
  });

  const userDeck = useSelector((state) => {
    return state.deck;
  });

  const resetCard = () => {
    setTimeout(() => {
      myCardRefs.current[myCardPos - 1].remove();
      cardRefs.current[oppCardPos - 1].remove();
      myCard = null;
      // oppCard = null;
      myCardPos = null;
      // oppCardPos = null;
      dispatch(gameActions.setCardToPlay(false));
    }, 3000);
  };

  const checkCards = (player1Card, player2Card) => {
    let damage;
    let winningElement;
    let damagedPlayer;

    // Determine the winning element
    if (myCard && oppCard) {
      cardRefs.current[
        oppCardPos
      ].innerHTML = `<img src=${oppCard.image} alt=${oppCard.title} class="gameplay-card" />`;
      if (player1Card.element === player2Card.element) {
        // If the two cards have the same element, use their power to determine the winner
        if (player1Card.power > player2Card.power) {
          winningElement = player1Card.element;
          damage = player1Card.power - player2Card.power;
          damagedPlayer = "player2";
        } else if (player2Card.power > player1Card.power) {
          winningElement = player2Card.element;
          damage = player2Card.power - player1Card.power;
          damagedPlayer = "player1";
        } else {
          // If the two cards have the same power, there is no damage
          winningElement = null;
          damage = 0;
          damagedPlayer = "none";
        }
      } else {
        // If the two cards have different elements, use the standard rules to determine the winner
        if (player1Card.element === "Red") {
          if (player2Card.element === "Green") {
            winningElement = "Red";
          } else if (player2Card.element === "Blue") {
            winningElement = "Blue";
          }
        } else if (player1Card.element === "Green") {
          if (player2Card.element === "Blue") {
            winningElement = "Green"; // fire > grass
            // grass > water
            // water > fire) {
            winningElement = "Blue";
          } else if (player2Card.element === "Green") {
            winningElement = "Green";
          }
        }

        // Determine the damage
        if (winningElement === player1Card.element) {
          damage = Math.max(player1Card.power - player2Card.power, 0);
          damagedPlayer = "player2";
        } else if (winningElement === player2Card.element) {
          damage = Math.max(player2Card.power - player1Card.power, 0);
          damagedPlayer = "player1";
        } else {
          damage = 0;
          damagedPlayer = "none";
        }
      }

      if (damagedPlayer === "player1") {
        dispatch(gameActions.decreasePlayer1HP(damage));
        resetCard();
      } else if (damagedPlayer === "player2") {
        dispatch(gameActions.decreasePlayer2HP(damage));
        resetCard();
      } else if (damagedPlayer === "none") {
        resetCard();
      }
    }
  };

  useEffect(() => {
    setInterval(() => {
      checkCards(myCard, oppCard);
    }, 1000);

    setInterval(() => {
      if (myCard) {
        dispatch(gameActions.setCardToPlay(true));
      }
    }, 1000);
  }, []);

  //establishes presence
  const channel = supabase.channel(channels);

  useEffect(() => {
    channel.on("presence", { event: "sync" }, () => {
      console.log("ACTIVE USERS", channel.presenceState());
    });

    // channel
    //   .on("presence", { event: "getUserDeck/" + channel }, (status) => {
    //   })
    //   .subscribe();
  });

  // useEffect(() => {
  //   // getChannel();
  //   // const channel = supabase.channel(channels, {
  //   //   config: { presence: { key: user.username } },
  //   // });

  //   channel
  //     // .on("presence", { event: "sync" }, async () => {
  //     //   const state = channel.presenceState();
  //     //   console.log(state, "SYNC STATE");
  //     //   channel.send({
  //     //     type: "broadcast",
  //     //     event: "getUserDeck/" + channels,
  //     //     payload: { data: { user: props.user, userDeck: props.userDeck } },
  //     //   });
  //     // })
  //     .on("presence", { event: "join" }, (object) => {
  //       setPresences((presences) => [...presences, object]);
  //     })
  //     .on("presence", { event: "leave" }, async (object1234) => {
  //       await channel.unsubscribe();
  //     })
  //     .on("broadcast", { event: "getUserDeck/" + channel }, async (payload) => {
  //       setLoading(true);
  //       setOpponentDeck((opponentDeck) => payload.payload?.data?.userDeck);
  //       setOpponentInfo((opponentInfo) => payload.payload.data?.user);
  //       setLoading(false);
  //     })
  //     .on("broadcast", { event: "cardmove" }, (payload) => {
  //       console.log(cardRefs?.current, "CARDMOVE BROADCAST");
  //       console.log(payload.payload, "CARD MOVE PAYLOAD");
  // cardRefs?.current[payload.payload.data.index - 1]?.click();
  //       oppCard = payload.payload.data.cardInfo;
  //       // checks();
  //     })
  //     .on("broadcast", { event: "cardmove" }, () => {});
  //   // checks();
  //   // }).subscribe(async (status) => {
  //   //   if (status === "SUBSCRIBED") {
  //   //     console.log(status, "CHANNEL STATUS ");
  //   //     const trackStatus = await channel.track({ key: user.username });
  //   //     console.log(trackStatus, "TRACK STATUS");
  //   //   }
  //   // })
  //   // .on("broadcast", { event: "getUserDeck/" + channels }, (payload) => {
  //   //   setLoading(true);
  //   //   setOpponentDeck((opponentDeck) => payload.payload?.data?.userDeck);
  //   //   setOpponentInfo((opponentInfo) => payload.payload.data?.user);
  //   //   setLoading(false);
  //   // })
  //   //
  // }, []);

  // useEffect(() => {
  //   // const channel = supabase.channel(Router.query.id);
  //   // channel
  //     // .on("presence", { event: "join" }, (object) => {
  //     //   setPresences((presences) => [...presences, object]);
  //     // })
  //     // .on("presence", { event: "leave" }, (object) => {
  //     //   channel.unsubscribe();
  //     // });
  // }, [presences]);

  useEffect(() => {
    // audioRef.current.play();

    channel
      .on("broadcast", { event: "getUserDeck/" + channels }, (payload) => {
        console.log(payload, "Broadcast GETUSERDECK TO SAVE IN GAME COMPONENT");
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
  }, []);

  const setMyCard = (card, index) => {
    myCard = card;
    myCardPos = index;
  };

  const setOppCardPos = (index) => {
    oppCardPos = index;
  };

  const leaveHandler = async () => {
    supabase.removeAllChannels();
    console.log("removed all channels");
    Router.push("http://localhost:3000/lobby/");
    supabase.subscribe(async (status) => {
      if (trackStatus === "ok") {
        const untrackStatus = await channel.untrack();
        console.log(trackStatus, "TRACKSTATUS LINE 57");
        console.log(untrackStatus, "STATUS/HAS LEFT");
      }
    });
    console.log(myCardRefs.current[1].innerHTML);
    // console.log(myRef.current);
    // console.log(myCard);
  };

  const test = () => {
    console.log(channels);
    console.log(Router.query.id);
    console.log(opponentDeck);
    console.log(opponentInfo);
  };

  return (
    //window container
    <>
      <button onClick={test}>Music</button>
      <audio src="/audio/music.mp3" ref={audioRef} />
      <button onClick={leaveHandler}>Leave Room</button>
      <GameContainer>
        {props.userDeck &&
          props.userDeck.map((card, i) => {
            return (
              <Card
                user={user}
                setShowSet={setShowSet}
                // checks={checks}
                key={uuidv4()}
                setMyCard={setMyCard}
                index={i + 1}
                zIndex={taps}
                card={card}
                x={i * 150}
                ref={(el) => (myCardRefs.current[i] = el)}
              />
            );
          })}
        {/* <div className="no-touchy"> */}
        {opponentDeck &&
          opponentDeck.length > 0 &&
          opponentDeck.map((card, i) => {
            return (
              <OpponentCard
                key={uuidv4()}
                zIndex={i + 1}
                card={card}
                ref={(el) => (cardRefs.current[i] = el)}
                x={i * -150}
                index={i}
                setOppCardPos={setOppCardPos}
              />
            );
          })}
        {/* </div> */}

        <Player1HP user={props.user} />
        <Player2HP opp={opponentInfo} />
      </GameContainer>
    </>
  );
};

export default GameComponent;
