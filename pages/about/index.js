import React from "react";
// import TeamMate from "@/components/teammate";
import { motion } from "framer-motion";
import container from "@/styles/variants";
import styles from "./About.module.css";

const About = () => {
  return (
    <motion.div
      variants={container}
      initial="initial"
      animate="visible"
      exit="exit"
    >
      <div className={styles.container}>
        <img
          className={styles.banner}
          src="https://i.imgur.com/7COqc6b.png"
          alt="Pick a developer, any developer!"
        ></img>
        <h2>The Game</h2>
        <p>
          This game is great and we're gonna knock it out of this park in the
          next coming week
        </p>
        <h2>The Team</h2>
        <div className={styles.kylesCard}>
          <h3>Kyle Wong</h3>
          <p>loremipsumloreamipsum</p>
          <a href={`mailto:kwong498@gmail.com}`}>✉️</a>
          <a href={`https://www.linkedin.com/in/kylematthewwong`}>👨🏽‍💼</a>
          <a href={`https://github.com/Kywongster`}>🐈‍⬛</a>
        </div>
        <div className={styles.victorsCard}>
          <h3>Victor Flores</h3>
          <p>loremipsumloreamipsum</p>
          <a href={`mailto:thelegendofvictor@gmail.com}`}>✉️</a>
          <a href={`https://www.linkedin.com/in/mikloflores`}>👨🏽‍💼</a>
          <a href={`https://github.com/Miklo1775`}>🐈‍⬛</a>
        </div>
        <div className={styles.wilsonsCard}>
          <h3>Wilson Yu</h3>
          <p>loremipsumloreamipsum</p>
          <a href={`mailto:wyu1277@gmail.com}`}>✉️</a>
          <a href={`https://www.linkedin.com/in/whydesigns`}>👨🏽‍💼</a>
          <a href={`https://github.com/github`}>🐈‍⬛</a>
        </div>
        <div className={styles.jonsCard}>
          <h3>Jonathan Wei</h3>
          <p>loremipsumloreamipsum</p>
          <a href={`mailto:jkwei.86@gmail.com}`}>✉️</a>
          <a href={`https://www.linkedin.com/in/linkedIn}`}>👨🏽‍💼</a>
          <a href={`https://github.com/github}`}>🐈‍⬛</a>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
