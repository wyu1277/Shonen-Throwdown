import React, { useState } from 'react';
import styles from './Modal.module.css';
import ReactDom from 'react-dom';
import { motion } from 'framer-motion';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

let Modal = (props) => {
	const user = useUser();
	const supabase = useSupabaseClient();

	const [deckFull, setDeckFull] = useState(false);
	const [dupCard, setDupCard] = useState(false);

	const addToDeck = async (e, cardId, userId) => {
		e.stopPropagation();
		// console.log('cardId', cardId);
		// console.log('userId', userId);
		const deckArr = await supabase.from('decks').select('*').eq('user_id', userId);
		// console.log('deckArr', deckArr);
		const cardArr = deckArr.data[0].card_ids;
		// console.log('cardArr', cardArr);
		// console.log('type of cardArr', typeof cardArr);
		if (cardArr.length >= 12 || cardArr.includes(cardId)) {
			if (cardArr.length >= 12) {
				setDeckFull(true);
				setTimeout(() => {
					setDeckFull(false);
				}, 3000);
			} else {
				setDupCard(true);
				setTimeout(() => {
					setDeckFull(false);
				}, 3000);
			}
		} else {
			cardArr.push(cardId);
			// console.log('updated cardArr', cardArr);
			const { data } = await supabase.from('decks').update({ card_ids: cardArr }).eq('user_id', userId);
			return data;
		}
	};


	return (
		<div className={`backdrop ${styles.pageParent}`}>
			{deckFull ? <p className={styles.message}>Deck is full!</p> : null}
			{dupCard ? <p className={styles.message}>Cannot have more than 1 of the same card in your deck!</p> : null}
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ duration: 0.2 }}
				className={styles.card}
				onClick={() => props.setShowModal(!props.showModal)}
			>
				{user ? (
					<button className={styles.deckButton} onClick={(e) => addToDeck(e, props.card.id, props.userId)}>
						Add To Deck
					</button>
				) : null}
				<button className={styles.close}>Close</button>
				<img src={props.card.image} alt={props.card.name} className={styles.img} />
			</motion.div>
			<motion.div
				initial={{ x: 0, y: 0, opacity: 0, color: '#000000', scale: 0 }}
				animate={{ x: -500, opacity: 1, scale: 1 }}
				exit={{ x: -100 }}
				transition={{ duration: 1 }}
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
