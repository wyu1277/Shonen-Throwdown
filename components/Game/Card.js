"use client";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import Router from "next/router";

const Card = (props) => {
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
    props.setShowSet(true);
    props.setMyCard(props.card);
    setTapCard(!tapCard);
    // audioRef.current.play();
    supabase
      .channel(channels, {
        config: { presence: { key: props.user.username } },
      })
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
    console.log(supabase);
  };
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={
        tapCard
          ? {
              scale: 1,
              opacity: 1,
              x: 600,
              y: -275,
              zIndex: `${12 - props.zIndex}`,
            }
          : {
              scale: 1,
              opacity: 1,
              backgroundImage: `${props.card.image}`,
            }
      }
      //   whileHover={{ backgroundColor: "white" }}
      onClick={cardHandler}
      className="user-container"
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

export default Card;
