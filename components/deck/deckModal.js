import React from 'react';
import styles from './DeckModal.module.css';
import { motion } from 'framer-motion';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { updateDeck } from '@/store/slices/deckSlice';
import { useDispatch } from 'react-redux';

let DeckModal = (props) => {
	const supabase = useSupabaseClient();
	const user = useUser();
	const dispatch = useDispatch();

	const removeFromDeck = async (cardId, userId, cardsData) => {
		// console.log('cardsData in removedeck func', cardsData);
		const returnArr = cardsData.filter((card) => card.id !== cardId);
		// console.log('returnArr', returnArr);
		const deckArr = await supabase.from('decks').select('*').eq('user_id', user.id);
		const cardArr = deckArr.data[0].card_ids;
		const updatedArr = cardArr.flat().filter((id) => id !== cardId);
		// console.log('cardArr', cardArr);
		// console.log('updatedArr', updatedArr);
		// console.log('removeFromDeck userID', userId);
		dispatch(updateDeck({ updatedArr, userId, returnArr }));
	};

	return (
		<div>
			<motion.div className="backdrop">
				<div className={styles.card} onClick={() => props.setShowModal(!props.showModal)}>
					{user ? (
						<button
							className={styles.removeButton}
							onClick={() => removeFromDeck(props.card.id, props.userId, props.cardsData)}
						>
							Remove from Deck
						</button>
					) : null}
					<button className={styles.close}>Close</button>
					<img src={props.card.image} alt={props.card.name} className={styles.img} />
				</div>
			</motion.div>
			<motion.div
				initial={{ x: 0, y: 0, opacity: 0, color: '#000000', scale: 0 }}
				animate={{ x: -600, opacity: 1, scale: 1 }}
				exit={{ x: -100 }}
				transition={{ duration: 1 }}
				className={styles.carddesc}
			>
				<div className={styles.description}>
					<h1>{props.card.name}</h1>
					<p>{props.card.description}</p>
				</div>
			</motion.div>
		</div>
	);
};

export default DeckModal;
