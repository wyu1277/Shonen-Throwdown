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
	const [isVisible, setIsVisible] = useState(false); // add state to control visibility
	const dispatch = useDispatch();

	const cardsData = useSelector(selectAllCards);

	useEffect(() => {
		setTimeout(() => {
			setPageMessage('There are no cards in your deck');
		}, 1000);
		const getCards = async () => {
			dispatch(fetchDeckCards(user.id));
		};
		getCards();
	}, [dispatch]);

	const handleCardClick = (card) => {
		setSelectedCard(card);
	};

	const handleDeckClick = () => {
		setIsVisible(!isVisible);
	};

	return (
		<motion.div variants={container} initial="initial" animate="visible" exit="exit" className={styles.pageParent}>
			<h1 style={{ cursor: 'pointer' }} className={styles.h1} onClick={handleDeckClick}>
				{isVisible ? 'Close Deck View' : 'View Your Deck'}
			</h1>
			{isVisible && (
				<div className={styles.cardParent}>
					{cardsData.length > 0 ? (
						cardsData.map((card) => (
							<motion.div
								whileHover={{ scale: 1.5 }}
								key={card.id}
								onClick={() => {
									setShowModal(!showModal);
									handleCardClick(card);
								}}
								className={styles.card}
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
			)}
			<div className={styles.modalParent}>
				{showModal && (
					<DeckModal
						cardsData={cardsData}
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
