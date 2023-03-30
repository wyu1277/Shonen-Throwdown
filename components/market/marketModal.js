import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './MarketModal.module.css';

let MarketModal = ({ cardArr, setShowModal, showModal }) => {
	return (
		<div className={`backdrop ${styles.pageParent}`}>
			<h1 className={styles.marketModalMessage}>Cards added to collection!</h1>
			{cardArr.map((card) => (
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ duration: 0.2 }}
					className={styles.card}
				>
					<img src={card.image} alt={card.name} className={styles.img} />
				</motion.div>
			))}
			<button className={styles.close} onClick={() => setShowModal(!showModal)}>
				Close
			</button>
		</div>
	);
};

export default MarketModal;
