import { useState } from "react";
import { motion } from "framer-motion";

const OpponentCard = (props) => {
  const [tapCard, setTapCard] = useState(false);
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={
        tapCard
          ? { scale: 1, opacity: 1, x: -600, y: 175, opacity: 1 }
          : { scale: 1, opacity: 0.6 }
      }
      className="opponent-container"
      // onClick={() => setTapCard(!tapCard)}
    >
      <img
        src={props.card.image}
        alt={props.card.title}
        className="gameplay-card"
      />
    </motion.div>
  );
};

export default OpponentCard;
