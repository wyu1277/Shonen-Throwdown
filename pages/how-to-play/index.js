import {Roboto, Noto_Serif} from 'next/font/google'
import styles from './howToPlay.module.css'

const roboto = Roboto({
	weight: '400',
	subsets: ['latin'],
  })

const notoSerif = Noto_Serif({
	subsets:['latin'],
	weight:'400',
})
export default function HowToPlay() {

	return (
		<div className={styles.howToPlayContainer}>
			<h1 className= {roboto.className}>Welcome To Capstone Card Game!</h1>
			<img className={styles.bannerimg} src='https://i.imgur.com/zXVH6ZY.jpeg'/>
				<h2 className= {roboto.className}>Introduction:</h2>
					<p className= {`${notoSerif.className} ${styles.p}`}>Welcome to Capstone Card Game! This is a strategic 1v1 trading card game that combines elements of chance, skill, and luck. Players build their own decks of 12 cards and battle against each other to see who comes out on top. Each card has its own unique stats and abilities, and players must use them strategically to outwit and defeat their opponents. One of the most exciting aspects of this game is that the cards are based on popular anime series such as Naruto, One Piece, Bleach, and Dragon Ball Z.  You'll have the chance to collect your favorite anime characters and use them to battle other players online. In this article, we'll go over the basic rules of the game so you can start playing right away!</p>
				<h2 className= {roboto.className}>Deck Building:</h2>
				<figure className={styles.figure}>
				<img className= {styles.cardimg} src='https://i.imgur.com/KFVq2ey.jpg'/>
				<figcaption className= {`${notoSerif.className} ${styles.caption}`}>Example of cards in the game.</figcaption>
				</figure>
					<p className= {`${notoSerif.className} ${styles.p}`}>To get started, you'll need to create an account with a unique in-game name, and select a themed starter deck from one of four anime series. Each starter deck contains 12 cards that you can use to play the game and then you can expand your collection by purchasing booster packs from the in-game store using the in-game currency. When building your deck, it's important to keep in mind the strengths and weaknesses of each card, as well as how they work together to create a cohesive strategy.</p>
				<h2 className= {roboto.className}>Gameplay:</h2>
					<p className= {`${notoSerif.className} ${styles.p}`}>Once you've built your deck, you're ready to start playing Capstone Card Game! The goal of the game is to reduce your opponent's HP to zero by playing cards and dealing damage. Each player starts with 15 HP, and the player who reduces their opponent's HP to zero first wins the game. Here's how to play:</p>
					<ol className= {`${notoSerif.className} `}>
						<li>Roll the Dice: To determine who goes first, both players roll a dice. The player with the higher roll goes first.</li>
						<li>Draw Cards: Each player draws 3 cards at the beginning of the game. Whenever a player plays a card, that player draws 1 card from their deck.</li>
						<li>Play Cards: On your turn, you can play one card from your hand by placing it in a designated space in front of you. Each card has an attribute such as red, blue, or green and an attack value ranging from 1 to 5.</li>
						<li>Battle: Once you've played a card, your opponent can choose to play a card from their hand in response. If their card has a higher attribute value or a higher attack value than your card, they beat your card and you must now play a card to beat theirs. If you or your opponent cannot beat the current card played, the owner of the current card's opponent takes damage to their HP equal to the card's power.</li>
						<li>Repeat: Players take turns playing cards and battling until one player's HP is reduced to zero or a player runs out of cards. The game then ends. If a player's life was reduced to 0, their opponent wins. If a player runs out of cards, the player who has the highest HP is the winner.</li>
					</ol>
				<h2 className= {roboto.className}>Conclusion:</h2>
				<p className= {`${notoSerif.className} ${styles.p}`}>And that's how you play Capstone Card Game! Remember to build your deck carefully, strategize your moves, and use your cards wisely to defeat your opponents. With practice, skill, and a bit of luck, you can become a master of this exciting trading card game.</p>

		</div>
	);
}
