// import { Auth } from '@supabase/auth-ui-react';
// import { ThemeSupa } from '@supabase/auth-ui-shared';
//! INSTALL WHEN NEEDED
import Modal from '@/components/collection/modal';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import styles from './Collection.module.css';
import { motion } from 'framer-motion';

const Collection = () => {
	const supabase = useSupabaseClient();
	const user = useUser();

	const [data, setData] = useState();
	const [searchInput, setSearchInput] = useState('');
	const [selectedCard, setSelectedCard] = useState(null);
	const [pageMessage, setPageMessage] = useState('Loading...');

	useEffect(() => {
		setTimeout(() => {
			setPageMessage('There are no cards avalible');
		}, 1000);
		if (!user) {
			const loadData = async () => {
				const { data } = await supabase.from('cards').select('*');
				setData(data);
			};
			loadData();
		} else {
			const loadData = async () => {
				const { data } = await supabase.from('collections').select('*').eq('user', user.id);
				setData(data);
				console.log('logged in collection', data);
			};
			loadData();
		}
	}, []);

	const filteredData = data && data.filter((card) => card.name.toLowerCase().includes(searchInput.toLowerCase()));

	const handleCardClick = (card) => {
		setSelectedCard(card);
	};

	return (
		<div className={styles.pageParent}>
			<div className={styles.searchParent}>
				<input
					className={styles.searchBar}
					type="text"
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
					placeholder="Search by name..."
				/>
			</div>
			<div className={styles.cardParent}>
				{filteredData !== undefined ? (
					filteredData.map((card) => (
						<motion.div
							whileHover={{ scale: 1.5 }}
							key={card.id}
							onClick={() => handleCardClick(card)}
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
			<div className={styles.modalParent}>
				<Modal open={selectedCard !== null} card={selectedCard} onClose={() => setSelectedCard(null)} />
			</div>
		</div>
	);
};

export default Collection;
