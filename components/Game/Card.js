import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";

const Card = (props) => {
  const audioRef = useRef(null);
  const [tapCard, setTapCard] = useState(false);
  // console.log(props.card);
  // console.log(props.zIndex);
  const cardHandler = () => {
    setTapCard(!tapCard);
    audioRef.current.play();
    supabase.channel("game1").subscribe().send({
      type: "broadcast",
      event: "cardmove",
      payload: props.index,
    });
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
