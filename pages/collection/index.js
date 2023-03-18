// import { Auth } from '@supabase/auth-ui-react';
// import { ThemeSupa } from '@supabase/auth-ui-shared';
//! INSTALL WHEN NEEDED
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

const Collection = () => {
	const supabase = useSupabaseClient();
	// const user = useUser();
	const [data, setData] = useState();

	useEffect(() => {
		const loadData = async () => {
			const { data } = await supabase.from('cards').select('*');
			setData(data);
		};
		loadData();
	}, []);

	return (
		<div>
			{data
				? data.map((card) => (
						<div>
							<p>name: {card.name}</p>
							<p>power: {card.power}</p>
							<p>element: {card.element}</p>
						</div>
				  ))
				: 'There are no cards'}
		</div>
	);
};

export default Collection;
