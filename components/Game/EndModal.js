import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import styles from './EndModal.module.css';
import Link from 'next/link';

let EndModal = () => {
	const winner = useSelector((state) => {
		return state.game.winner;
	});

	return (
		<div className={`backdrop ${styles.pageParent}`}>
			<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }} className={styles.card}>
				<h1 className={styles.winMessage}>{winner} Wins!</h1>
				<Link className={styles.link} href="/lobby">
					Return to game lobby
				</Link>
			</motion.div>
		</div>
	);
};

export default EndModal;
