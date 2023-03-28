import { motion } from "framer-motion";
import { useState } from "react";

const Card = (props) => {
  const [tapCard, setTapCard] = useState(false);
  // console.log(props.card);
  // console.log(props.zIndex);
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
      onClick={() => setTapCard(!tapCard)}
      className="user-container"
    >
      <img
        src={props.card.image}
        alt={props.card.title}
        className="gameplay-card"
      />
    </motion.div>
  );
};

export default Card;
