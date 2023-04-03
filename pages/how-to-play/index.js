import { Roboto, Noto_Serif } from "next/font/google";
import styles from "./howToPlay.module.css";
import { motion } from "framer-motion";
import container from "@/styles/variants";
import { toggleActions } from "@/store/slices/toggleSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: "400",
});
export default function HowToPlay() {
  const toggledState = useSelector((state) => {
    return state.toggle;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const toggling = async () => {
      dispatch(toggleActions.toggle(true));

      dispatch(toggleActions.toggle(false));
    };
  });
  console.log(toggledState);
  return (
    <motion.div
      variants={container}
      initial="initial"
      animate="visible"
      exit="exit"
      className={styles.howToPlayContainer}
    >
      {!toggledState ? (
        <>
          <h1 className={roboto.className}>Welcome To Shonen Throwdown!</h1>
          <img
            className={styles.bannerimg}
            src="https://i.imgur.com/zXVH6ZY.jpeg"
          />
          <h2 className={roboto.className}>Introduction:</h2>
          <p className={`${notoSerif.className} ${styles.p}`}>
            Welcome to Shonen Throwdown! This is a strategic 1v1 trading card
            game that combines elements of chance, skill, and luck. Players
            build their own decks of 12 cards and battle against each other to
            see who comes out on top. Each card has its own unique stats and
            abilities, and players must use them strategically to outwit and
            defeat their opponents. One of the most exciting aspects of this
            game is that the cards are based on popular anime series such as
            Naruto, One Piece, Bleach, and Dragon Ball Z. You'll have the chance
            to collect your favorite anime characters and use them to battle
            other players online. In this article, we'll go over the basic rules
            of the game so you can start playing right away!
          </p>
          <h2 className={roboto.className}>Deck Building:</h2>
          <figure className={styles.figure}>
            <img
              className={styles.cardimg}
              src="https://i.imgur.com/KFVq2ey.jpg"
            />
            <figcaption className={`${notoSerif.className} ${styles.caption}`}>
              Example of cards in the game.
            </figcaption>
          </figure>
          <p className={`${notoSerif.className} ${styles.p}`}>
            To get started, you'll need to create an account with a unique
            in-game name. You'll be given a starter deck containing 12 cards
            that you can use to play the game and then you can expand your
            collection by purchasing booster packs from the in-game store using
            the in-game currency. When building your deck, it's important to
            keep in mind the strengths and weaknesses of each card, as well as
            how they work together to create a cohesive strategy.
          </p>
          <h2 className={roboto.className}>Gameplay:</h2>
          <p className={`${notoSerif.className} ${styles.p}`}>
            Once you've built your deck, you're ready to start playing Shonen
            Throwdown! The goal of the game is to reduce your opponent's HP to
            zero by playing cards and dealing damage. Each player starts with 15
            HP, and the player who reduces their opponent's HP to zero first
            wins the game. Here's how to play:
          </p>
          <ol className={`${notoSerif.className} ${styles.p} `}>
            <li className={`${notoSerif.className} ${styles.p} `}>
              Play Cards: On your turn, you can play one card from your deck by
              placing it in a designated space in front of you. Each card has an
              element such as red, blue, or green and an attack power ranging
              from 1 to 5.Red beats Green, Green beats Blue, and Blue beats Red.
              If the elements of both cards are tied, the card with the higher
              power value wins. If both the elements and power values are tied,
              no card wins.
            </li>
            <li className={`${notoSerif.className} ${styles.p} `}>
              Battle: When both players have played a card, they are revealed
              and compared. If one card beats the other based on element and
              power, the difference in power between the two cards is dealt to
              the loser's HP.
            </li>
            <li className={`${notoSerif.className} ${styles.p} `}>
              Repeat: Players take turns playing cards and battling until one
              player's HP is reduced to zero or if there are no more available
              cards to play. The game then ends. The winner at the end of the
              game is the player with the higher HP total. If that is tied, the
              game ends in a draw.
            </li>
          </ol>
          <h2 className={roboto.className}>Conclusion:</h2>
          <p className={`${notoSerif.className} ${styles.p}`}>
            And that's how you play Shonen Throwdown! Remember to build your
            deck carefully, strategize your moves, and use your cards wisely to
            defeat your opponents. With practice, skill, and a bit of luck, you
            can become a master of this exciting trading card game.
          </p>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </motion.div>
  );
}
