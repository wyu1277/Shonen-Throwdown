import React, { useState } from "react";
import styles from "./Modal.module.css";
import ReactDom from "react-dom";
import { motion } from "framer-motion";

let Modal = (props) => {
  console.log(props);
  //   if (!open) return null;
  //   return ReactDom.createPortal(
  //     <motion.div className="backdrop">
  //       <div
  //         className={styles.card}
  //         onClick={() => props.setShowModal(!props.showModal)}
  //       >
  //         <button className={styles.close}>Close</button>
  //         <img src="s" alt="fe" className={styles.img} />
  //       </div>
  //     </motion.div>,
  //     document.getElementById("portal")
  //   );
  return (
    <div className="backdrop">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
        className={styles.card}
        onClick={() => props.setShowModal(!props.showModal)}
      >
        <button className={styles.close}>Close</button>
        <img
          src={props.card.image}
          alt={props.card.name}
          className={styles.img}
        />
      </motion.div>

      <motion.div
        initial={{ x: 0, y: 0, opacity: 0, color: "#000000", scale: 0 }}
        animate={{ x: -500, opacity: 1, scale: 1 }}
        exit={{ x: -100 }}
        transition={{ duration: 1.5 }}
        className={styles.carddesc}
      >
        <div className={styles.description}>
          <h1>{props.card.name}</h1>
          <p>Enter Description here...</p>
          <p>Please insert an even longer description here....</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
