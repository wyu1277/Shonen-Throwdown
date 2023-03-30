import { useUser } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import container from '../../styles/variants';
import { useDispatch, useSelector } from 'react-redux';
import styles from './store.module.css';

const Store = () => {
	const [pageMessage, setPageMessage] = useState('Loading...');
	const [isVisible, setIsVisible] = useState(false); // add state to control visibility

	const handleStoreClick = () => {
		setIsVisible(!isVisible);
	};

	return (
		<motion.div variants={container} initial="initial" animate="visible" exit="exit" className={styles.pageParent}>
			<h1 className={styles.h1} onClick={handleStoreClick}>
				{isVisible ? 'Close Store' : 'Store'}
			</h1>
			{isVisible && (
				<div>
					<h1>store!!</h1>
				</div>
			)}
		</motion.div>
	);
};

export default Store;
