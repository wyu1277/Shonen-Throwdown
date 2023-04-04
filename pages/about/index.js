import React, { useEffect } from "react";
import { motion } from "framer-motion";
import container from "@/styles/variants";
import styles from "./About.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faSquareGithub } from "@fortawesome/free-brands-svg-icons";
import { faSquareEnvelope } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  useEffect(() => {
    const buttons = document.querySelectorAll("[data-carousel-button]");

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
  });

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
          <ul className={styles.dataSlides} data-slides>
            <li className={styles.slide} data-active>
              <img
                className={styles.slideImg}
                src="https://i.imgur.com/viDgPzH.png"
                alt="developer-card-kyle"
              ></img>
              <div className={styles.cardButtons}>
                <a href={`mailto:kwong498@gmail.com`}>
                  <FontAwesomeIcon
                    icon={faSquareEnvelope}
                    className={styles.icons}
                  />
                </a>
                <a href={`https://www.linkedin.com/in/kylematthewwong`}>
                  <FontAwesomeIcon icon={faLinkedin} className={styles.icons} />
                </a>
                <a href={`https://github.com/Kywongster`}>
                  <FontAwesomeIcon
                    icon={faSquareGithub}
                    className={styles.icons}
                  />
                </a>
              </div>
            </li>
            <li className={styles.slide}>
              <img
                className={styles.slideImg}
                src="https://i.imgur.com/mbhsWYT.png"
                alt="developer-card-victor"
              ></img>
              <div className={styles.cardButtons}>
                <a href={`mailto:thelegendofvictor@gmail.com`}>
                  <FontAwesomeIcon
                    icon={faSquareEnvelope}
                    className={styles.icons}
                  />
                </a>
                <a href={`https://www.linkedin.com/in/mikloflores`}>
                  <FontAwesomeIcon icon={faLinkedin} className={styles.icons} />
                </a>
                <a href={`https://github.com/Miklo1775`}>
                  <FontAwesomeIcon
                    icon={faSquareGithub}
                    className={styles.icons}
                  />
                </a>
              </div>
            </li>
            <li className={styles.slide}>
              <img
                className={styles.slideImg}
                src="https://i.imgur.com/pQneKpj.png"
                alt="developer-card-wilson"
              ></img>
              <div className={styles.cardButtons}>
                <a href={`mailto:wyu1277@gmail.com`}>
                  <FontAwesomeIcon
                    icon={faSquareEnvelope}
                    className={styles.icons}
                  />
                </a>
                <a href={`https://www.linkedin.com/in/whydesigns`}>
                  <FontAwesomeIcon icon={faLinkedin} className={styles.icons} />
                </a>
                <a href={`https://github.com/wyu1277`}>
                  <FontAwesomeIcon
                    icon={faSquareGithub}
                    className={styles.icons}
                  />
                </a>
              </div>
            </li>
            <li className={styles.slide}>
              <img
                className={styles.slideImg}
                src="https://i.imgur.com/TFR01Al.png"
                alt="developer-card-jon"
              ></img>
              <div className={styles.cardButtons}>
                <a href={`mailto:jkwei.86@gmail.com`}>
                  <FontAwesomeIcon
                    icon={faSquareEnvelope}
                    className={styles.icons}
                  />
                </a>
                <a href={`https://www.linkedin.com/in/wei-jon/`}>
                  <FontAwesomeIcon icon={faLinkedin} className={styles.icons} />
                </a>
                <a href={`https://github.com/JonWei86`}>
                  <FontAwesomeIcon
                    icon={faSquareGithub}
                    className={styles.icons}
                  />
                </a>
              </div>
            </li>
            <button
              className={styles.carouselButtonNext}
              data-carousel-button="next"
            >
              &#11162;
            </button>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
