import { forwardRef, useState, useRef } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useSelector } from "react-redux";

const OpponentCard = (props, ref) => {
  // const myCard = props.showMyCard();
  const audioRef = useRef(null);

  const myCard = useSelector((state) => {
    return state.game.setCardToPlay;
  });

  const [tapCard, setTapCard] = useState(false);
  const opponentCardHandler = () => {
    setTapCard(!tapCard);
    props.setOppCardPos(props.index);
  };

  return (
    <motion.div
      initial={{ scale: 0, x: props.x }}
      animate={
        tapCard
          ? {
              scale: 1,
              opacity: 1,
              x: -600,
              y: 175,
              opacity: 1,
              zIndex: `${12 - props.zIndex}`,
            }
          : { scale: 1 }
      }
      className="opponent-container"
      onClick={() => opponentCardHandler()}
      ref={ref}
    >
      {tapCard ? (
        <img
          src="https://i.imgur.com/JBJoKPI.png"
          alt={props.card.title}
          className="gameplay-card"
        />
      ) : (
        <img
          src={myCard ? props.card.image : "https://i.imgur.com/JBJoKPI.png"}
          alt={props.card.title}
          className="gameplay-card"
        />
      )}
      <audio src="/audio/Cut.wav" ref={audioRef} />
    </motion.div>
  );
};

export default forwardRef(OpponentCard);
