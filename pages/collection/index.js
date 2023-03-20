// import { Auth } from '@supabase/auth-ui-react';
// import { ThemeSupa } from '@supabase/auth-ui-shared';
//! INSTALL WHEN NEEDED
import Modal from '@/components/collection/modal';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import styles from './Collection.module.css';

const Collection = () => {
	const supabase = useSupabaseClient();
	const [data, setData] = useState();
	const [searchInput, setSearchInput] = useState('');
	const [selectedCard, setSelectedCard] = useState(null);

	useEffect(() => {
		const loadData = async () => {
			const { data } = await supabase.from('cards').select('*');
			setData(data);
		};
		loadData();
	}, []);

	const filteredData = data && data.filter((card) => card.name.toLowerCase().includes(searchInput.toLowerCase()));

	const handleCardClick = (card) => {
		setSelectedCard(card);
	};

	return (
		<div>
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
						<div key={card.id} onClick={() => handleCardClick(card)} className={styles.card}>
							<img src={card.image} alt={card.name} className={styles.img} />
						</div>
					))
				) : (
					<div>There are no cards</div>
				)}
			</div>
			<Modal open={selectedCard !== null} card={selectedCard} onClose={() => setSelectedCard(null)} />
		</div>
	);
};

export default Collection;
