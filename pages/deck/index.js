import { useUser } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import container from '../../styles/variants';
import styles from './Deck.module.css';
import DeckModal from '@/components/deck/deckModal';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllCards, fetchDeckCards } from '@/store/slices/deckSlice';

const Deck = () => {
	const user = useUser();
	const [selectedCard, setSelectedCard] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [pageMessage, setPageMessage] = useState('Loading...');
	const dispatch = useDispatch();

	const cardsData = useSelector(selectAllCards);

	useEffect(() => {
		setTimeout(() => {
			setPageMessage('There are no cards avalible');
		}, 1000);
		const getCards = async () => {
			dispatch(fetchDeckCards(user.id));
		};
		getCards();
	}, [dispatch]);

	const handleCardClick = (card) => {
		setSelectedCard(card);
	};
	// !== undefined
	return (
		<motion.div variants={container} initial="initial" animate="visible" exit="exit" className={styles.pageParent}>
			<div>Prepare Your Team for Battle!</div>
			<div className={styles.cardParent}>
				{cardsData ? (
					cardsData.map((card) => (
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
						userId={user.id}
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
