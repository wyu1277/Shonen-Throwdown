"use client";
import React from "react";
// import TeamMate from "@/components/teammate";
import { motion } from "framer-motion";
import container from "@/styles/variants";
import styles from "./About.module.css";

const About = () => {
  const buttons =
    typeof window !== "undefined" &&
    document.querySelectorAll("[data-carousel-button]");
  if (typeof window !== "undefined") {
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        const slides = button
          .closest("[data-carousel]")
          .querySelector("[data-slides]");
        const activeSlide = slides.querySelector("[data-active]");
        let newIndex = [...slides.children].indexOf(activeSlide) + offset;
        if (newIndex < 0) newIndex = slides.children.length - 1;
        if (newIndex >= slides.children.length) newIndex = 0;

        slides.children[newIndex].dataset.active = true;
        delete activeSlide.dataset.active;
      });
    });
  }
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
        <div className={styles.carousel} data-carousel>
          <button
            className={styles.carouselButtonPrev}
            data-carousel-button="prev"
          >
            &#11160;
          </button>
          <div className={styles.dataSlides} data-slides>
            <div className={styles.slide} data-active>
              <img
                className={styles.slideImg}
                src="https://i.imgur.com/GDBpXpC.png"
                alt="developer-card-kyle"
              ></img>
              <h3>Kyle Wong</h3>
              <p>loremipsumloreamipsum</p>
              <a href={`mailto:kwong498@gmail.com}`}>✉️</a>
              <a href={`https://www.linkedin.com/in/kylematthewwong`}>👨🏽‍💼</a>
              <a href={`https://github.com/Kywongster`}>🐈‍⬛</a>
            </div>
            <div className={styles.slide}>
              <img
                className={styles.slideImg}
                src="https://i.imgur.com/u7SeDyz.png"
                alt="developer-card-victor"
              ></img>
              <h3>Victor Flores</h3>
              <p>loremipsumloreamipsum</p>
              <a href={`mailto:thelegendofvictor@gmail.com}`}>✉️</a>
              <a href={`https://www.linkedin.com/in/mikloflores`}>👨🏽‍💼</a>
              <a href={`https://github.com/Miklo1775`}>🐈‍⬛</a>
            </div>
            <div className={styles.slide}>
              <img
                className={styles.slideImg}
                src="https://i.imgur.com/nmhfFBZ.png"
                alt="developer-card-wilson"
              ></img>
              <h3>Wilson Yu</h3>
              <p>loremipsumloreamipsum</p>
              <a href={`mailto:wyu1277@gmail.com}`}>✉️</a>
              <a href={`https://www.linkedin.com/in/whydesigns`}>👨🏽‍💼</a>
              <a href={`https://github.com/github`}>🐈‍⬛</a>
            </div>
            <div className={styles.slide}>
              <img
                className={styles.slideImg}
                src="https://i.imgur.com/u7SeDyz.png"
                alt="developer-card-jon"
              ></img>
              <h3>Jonathan Wei</h3>
              <p>loremipsumloreamipsum</p>
              <a href={`mailto:jkwei.86@gmail.com}`}>✉️</a>
              <a href={`https://www.linkedin.com/in/linkedIn}`}>👨🏽‍💼</a>
              <a href={`https://github.com/github}`}>🐈‍⬛</a>
            </div>
            <button
              className={styles.carouselButtonNext}
              data-carousel-button="next"
            >
              &#11162;
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
