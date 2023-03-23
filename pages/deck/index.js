import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import container from '../../styles/variants';
import styles from './Deck.module.css';
import DeckModal from '@/components/deck/deckModal';

const Deck = () => {
	const user = useUser();
	const [data, setData] = useState();
	const [selectedCard, setSelectedCard] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [pageMessage, setPageMessage] = useState('Loading...');
	const supabase = useSupabaseClient();

	useEffect(() => {
		const getDeckCards = async () => {
			const deckRow = await supabase.from('decks').select('*').eq('user_id', user.id);
			console.log('Row from deck table', deckRow.data[0].card_ids);
			const cards = await supabase.from('cards').select('*').in('id', deckRow.data[0].card_ids);
			console.log('cards', cards.data);
			setData(cards.data);
		};
		getDeckCards();
	}, []);

	const handleCardClick = (card) => {
		setSelectedCard(card);
	};

	return (
		<motion.div variants={container} initial="initial" animate="visible" exit="exit" className={styles.pageParent}>
			<div className={styles.cardParent}>
				{data !== undefined ? (
					data.map((card) => (
						<motion.div
							whileHover={{ scale: 1.5 }}
							key={card.id}
							onClick={() => {
								setShowModal(!showModal);
								handleCardClick(card);
							}}
							className={styles.card}
							//   whileTap={{ scale: 0.5, x: window.innerWidth / 2 }}
						>
							<img src={card.image} alt={card.name} className={styles.img} />
						</motion.div>
					))
				) : (
					<div className={styles.loading}>
						<h1>{pageMessage}</h1>
					</div>
				)}
			</div>
			<div className={styles.modalParent}>
				{showModal && (
					<DeckModal
						showModal={showModal}
						setShowModal={setShowModal}
						card={selectedCard}
						onClose={() => setSelectedCard(null)}
					/>
				)}
			</div>
		</motion.div>
	);
};

export default Deck;
