// import { Auth } from '@supabase/auth-ui-react';
// import { ThemeSupa } from '@supabase/auth-ui-shared';
//! INSTALL WHEN NEEDED
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import styles from './Collection.module.css';

const Collection = () => {
	const supabase = useSupabaseClient();
	const [data, setData] = useState();
	const [searchInput, setSearchInput] = useState('');

	useEffect(() => {
		const loadData = async () => {
			const { data } = await supabase.from('cards').select('*');
			setData(data);
		};
		loadData();
	}, []);

	const filteredData = data && data.filter((card) => card.name.toLowerCase().includes(searchInput.toLowerCase()));

	return (
		<div>
			<div>
				<input
					className={styles.searchBar}
					type="text"
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
					placeholder="Search by name..."
				/>
			</div>
			<div className={styles.cardParent}>
				{filteredData !== undefined
					? filteredData.map((card) => (
							<div className={styles.card} key={card.id}>
								{/* REPLACE WITH CARD IMAGE LATER */}
								<p>name: {card.name}</p>
								<p>power: {card.power}</p>
								<p>element: {card.element}</p>
							</div>
					  ))
					: 'There are no cards'}
			</div>
		</div>
	);
};

export default Collection;
