"use client";
import { motion } from "framer-motion";
import { useState, useRef, forwardRef } from "react";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import Router from "next/router";

const Card = (props, refs) => {
  const channels = Router.query.id;
  const audioRef = useRef(null);
  const [tapCard, setTapCard] = useState(true);
  // const [channels, setChannels] = useState();
  // setTapCard(false);

  // const getChannel = async () => {
  //   const channels = Router.query.id;
  //   // console.log("this is new channel", newChannel);
  //   setChannels(newChannel.id);
  // };

  useEffect(() => {
    // getChannel();
    setTapCard(!tapCard);
  }, []);

  const cardHandler = () => {
    console.log(props.index);
    props.setMyCard(props.card, props.index);
    setTapCard(!tapCard);
    // audioRef.current.play();
    supabase
      .channel(channels)
      .subscribe()
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
