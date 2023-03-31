"use client";
import { motion } from "framer-motion";
import { useState, useRef, forwardRef } from "react";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { gameActions } from "@/store/slices/gameSlice";

const Card = (props, refs) => {
  const dispatch = useDispatch();
  const channels = Router.query.id;
  const audioRef = useRef(null);
  const [tapCard, setTapCard] = useState(true);

  const health = useSelector((state) => {
    return state.game.player1HP;
  });

  const cardInPlay = useSelector((state) => {
    return state.game.cardInPlay;
  });

  const counter = useSelector((state) => {
    return state.game.counter;
  });

  // const counterCheck = () => {
  //   console.log(counter);
  //   if (counter > 11) {
  //     console.log("This game is ova");
  //   }
  // };

  // const [channels, setChannels] = useState();
  // setTapCard(false);

  // const getChannel = async () => {
  //   const channels = Router.query.id;
  //   // console.log("this is new channel", newChannel);
  //   setChannels(newChannel.id);
  // };
  useEffect(() => {
    const counterCheck = () => {
      // console.log(counter);
      if (counter > 11) {
        console.log("This game is ova");
      }
    };

    const interval = setInterval(() => {
      counterCheck();
    }, 1000);

    return () => clearInterval(interval);
  }, [counter]);

  useEffect(() => {
    // getChannel();
    setTapCard(!tapCard);
  }, []);

  const cardHandler = () => {
    console.log(props.card);
    console.log(cardInPlay);
    if (!cardInPlay) {
      props.setMyCard(props.card, props.index);
      setTapCard(!tapCard);
      // audioRef.current.play();
      supabase
        .channel(channels)
        .subscribe(async (status) => {
          console.log(status);
        })
        .send({
          type: "broadcast",
          event: "cardmove",
          payload: {
            data: {
              index: props.index,
              cardInfo: props.card,
            },
          },
        });

      dispatch(gameActions.increaseCounter());
      // counterCheck();
    }
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, x: props.x }}
      animate={
        tapCard
          ? {
              scale: 1,
              opacity: 1,
              x: 600,
              y: -275,
              zIndex: `${props.zIndex}`,
            }
          : {
              scale: 1,
              opacity: 1,
              backgroundImage: `${props.card.image}`,
            }
      }
      //   whileHover={{ backgroundColor: "white" }}
      onClick={cardHandler}
      whileHover={{ scale: 2 }}
      className="user-container"
      ref={refs}
    >
      <img
        src={props.card.image}
        alt={props.card.title}
        className="gameplay-card"
      />
      <audio src="/audio/Cut.wav" ref={audioRef} />
    </motion.div>
  );
};

export default forwardRef(Card);
