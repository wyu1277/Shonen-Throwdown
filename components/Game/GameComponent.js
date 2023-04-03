"use client";
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

let oppCard = null;
let myCard = null;
let myCardPos = null;
let oppCardPos = null;
let oppImage = null;

let taps = 0;

const GameComponent = (props) => {
  const myRef = useRef(null);
  const duelRef = useRef(null);
  const sendRef = useRef(null);
  // const [taps, setTaps] = useState(0);
  const [playAudio, setPlayAudio] = useState(true);
  const cardRefs = useRef(new Array());
  const myCardRefs = useRef(new Array());
  const buttonRef = useRef();
  const divRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [presences, setPresences] = useState([]);

  // Determine the winning element
  // const [opponentDeck, setOpponentDeck] = useState([]);
  // const [opponentInfo, setOpponentInfo] = useState({});
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

  const player2 = useSelector((state) => {
    return state.game.player2;
  });

  const player2Deck = useSelector((state) => {
    return state.game.player2Deck;
  });

  const ended = useSelector((state) => {
    return state.game.ended;
  });

  const resetCard = () => {
    if (myCardPos !== null && oppCardPos !== null) {
      // console.log(myCardRefs.current[myCardPos - 1]);
      oppImage = null;
      if (myCardRefs.current[myCardPos - 1] !== null) {
        myCardRefs.current[myCardPos - 1].remove();
        cardRefs.current[oppCardPos].remove();
      }
      myCardPos = null;
      oppCardPos = null;
      myCard = null;
      oppCard = null;

      dispatch(gameActions.setCardToPlay(false));
    }
  };

  const checkCards = (player1Card, player2Card) => {
    let damage;
    let winningElement;
    let damagedPlayer;
    // console.log(myCardPos, oppCardPos, "CARD POSITIONS");
    // console.log(myCard, "MY CArd  BEFORE ");
    // console.log(oppImage, "opp CARD IMAGE BEFORE ");
    if (myCard !== null && oppImage !== null) {
      // console.log(myCardRefs, "MY CARD REFS");
      // console.log(cardRefs, 'cardRefs');
      // console.log(oppCardPos, 'oppCardPosition');
      if (cardRefs.current[oppCardPos] !== null) {
        cardRefs.current[
          oppCardPos
        ].innerHTML = `<img src=${oppImage} alt="card" class="gameplay-card" />`;
      }
    }

    if (myCard && oppCard) {
      // if (myCardPos && oppCardPos) {
      //   cardRefs.current[
      //     oppCardPos
      //   ].innerHTML = `<img src=${oppImage} alt="card" class="gameplay-card" />`;
      // }
      // setTimeout(() => {
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
          } else if (player2Card.element === "Red") {
            winningElement = "Red";
          }
        } else if (player1Card.element === "Blue") {
          if (player2Card.element === "Green") {
            winningElement = "Green"; // fire > grass
            // grass > water
            // water > fire) {
          } else if (player2Card.element === "Red") {
            winningElement = "Blue";
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
        console.log(damage, "PLAYER1 DAMAGE");
        dispatch(gameActions.decreasePlayer1HP(damage));
        resetCard();
      } else if (damagedPlayer === "player2") {
        console.log(damage, "PLAYER2 DAMAGE");

        dispatch(gameActions.decreasePlayer2HP(damage));
        resetCard();
      } else if (damagedPlayer === "none") {
        console.log(damage, "NO PLAYER DAMAAGE");
        resetCard();
      }
      console.log(winningElement);
      // }, 3000);
    }
  };

  useEffect(() => {
    console.log("GAME HAS ENDDED NOT DOING ANYMORE CHECKS");
    // if (!ended) {
    setInterval(() => {
      checkCards(myCard, oppCard);
    }, 2000);

    setInterval(() => {
      if (myCard) {
        dispatch(gameActions.setCardToPlay(true));
      }
    }, 100);
  }, []);

  //establishes presence
  const channel = supabase.channel(channels);

  useEffect(() => {
    channel.on("presence", { event: "sync" }, () => {
      console.log("ACTIVE USERS", channel.presenceState());
    });
  });

  useEffect(() => {
    // duelRef.current.play();
    // setTimeout(() => {
    //   //   audioRef.current.play();
    // }, 4500);

    channel
      .on("broadcast", { event: "getUserDeck/" + channels }, (payload) => {
        console.log(payload, "Broadcast GETUSERDECK TO SAVE IN GAME COMPONENT");
        setLoading(true);
        // setOpponentDeck((opponentDeck) => payload.payload?.data?.userDeck);
        // setOpponentInfo((opponentInfo) => payload.payload.data?.user);
        setLoading(false);
      })
      .on("broadcast", { event: "cardmove" }, (payload) => {
        console.log(cardRefs?.current);
        console.log(payload.payload);
        cardRefs?.current[payload.payload.data.index - 1]?.click();
        console.log(payload.payload.data.cardInfo.image);
        oppImage = payload.payload.data.cardInfo.image;
        setTimeout(() => {
          oppCard = payload.payload.data.cardInfo;
        }, 2000);
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

  const showMyCard = (card, index) => {
    return myCard;
  };

  const setOppCardPos = (index) => {
    oppCardPos = index;
  };

  const leaveHandler = async () => {
    const DeleteCurrentGame = async () => {
      let { data } = await supabase
        .from("game")
        .select("*")
        .eq("id", channels)
        .single();
      // console.log(
      //   "🚀 ~ file: GameComponent.js:257 ~ DeleteCurrentGame ~ channel.id:",
      //   channels
      // );
      // console.log("CURRENT GAME", data);
      let currentGame = data;
      if (currentGame.isDraw === false && !currentGame.winner) {
        supabase.removeAllChannels();
        console.log("removed all channels");
        Router.push("http://localhost:3000/lobby/");
        // supabase.subscribe(async (status) => {
        //   if (trackStatus === "ok") {
        //     const untrackStatus = await channel.untrack();
        //     console.log(trackStatus, "TRACKSTATUS LINE 57");
        //     console.log(untrackStatus, "STATUS/HAS LEFT");
        //   }
        // });
        await supabase.from("game").delete().eq("id", channels);
      }
    };
    DeleteCurrentGame();
  };

  const test = () => {
    console.log(ended);
  };

  return (
    //window container
    <>
      <button onClick={test}>Music</button>
      <audio src="/audio/Cut.wav" ref={sendRef} />
      <audio src="/audio/duel.mp3" ref={duelRef} />
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
        <div className="no-touchy">
          {player2Deck &&
            player2Deck.length > 0 &&
            player2Deck.map((card, i) => {
              return (
                <OpponentCard
                  showMyCard={showMyCard}
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
        </div>
        <Player1HP />
        <Player2HP />
      </GameContainer>
    </>
  );
};

export default GameComponent;
