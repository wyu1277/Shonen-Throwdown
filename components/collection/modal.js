import React, { useState } from 'react';
import styles from './Modal.module.css';
import ReactDom from 'react-dom';
import { motion } from 'framer-motion';
import { useUser } from '@supabase/auth-helpers-react';

let Modal = (props) => {
	const user = useUser();
	const supabase = useSupabaseClient();

	const addToDeck = async (cardId, userId) => {
		const deckArr = await supabase.from('decks').select('*').eq('user_id', userId);
		const cardArr = deckArr.data[0].card_ids;
		if (cardArr.length >= 12 || cardArr.includes(cardId)) {
			setTimeout;
		} else {
			const updatedArr = cardArr;
		}
		console.log('cardArr', cardArr);
		console.log('cardId', cardId);
		console.log('userId', userId);
	};

	return (
		<div className="backdrop">
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ duration: 0.2 }}
				className={styles.card}
				onClick={() => props.setShowModal(!props.showModal)}
			>
				{user ? (
					<button className={styles.deckButton} onClick={() => addToDeck(props.card.id, props.userId)}>
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
