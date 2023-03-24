import React, { useState } from 'react';
import styles from './DeckModal.module.css';
import ReactDom from 'react-dom';
import { motion } from 'framer-motion';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { updateDeck, fetchDeckCards } from '@/store/slices/deckSlice';
import { useDispatch } from 'react-redux';

let DeckModal = (props) => {
	const supabase = useSupabaseClient();
	const user = useUser();
	const dispatch = useDispatch();

	const removeFromDeck = async (cardId, userId) => {
		const deckArr = await supabase.from('decks').select('*').eq('user_id', user.id);
		const cardArr = deckArr.data[0].card_ids;
		const updatedArr = cardArr.flat().filter((id) => id !== cardId);
		console.log('cardArr', cardArr);
		console.log('updatedArr', updatedArr);
		console.log('removeFromDeck userID', userId);
		dispatch(updateDeck({ updatedArr, userId }));
		dispatch(fetchDeckCards(user.id));
	};

	return (
		<motion.div className="backdrop">
			<div className={styles.card} onClick={() => props.setShowModal(!props.showModal)}>
				{user ? (
					<button className={styles.removeButton} onClick={() => removeFromDeck(props.card.id, props.userId)}>
						Remove from Deck
					</button>
				) : null}
				<button className={styles.close}>Close</button>
				<img src={props.card.image} alt={props.card.name} className={styles.img} />
			</div>
		</motion.div>
	);
};

export default DeckModal;
