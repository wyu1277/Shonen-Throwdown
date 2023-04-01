import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './EndModal.module.css';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { gameActions } from '@/store/slices/gameSlice';

let EndModal = () => {
	const dispatch = useDispatch();
	const winner = useSelector((state) => {
		return state.game.winner;
	});

	const handleEndGame = (e) => {
		e.preventDefault();
		dispatch(gameActions.endGame(false));
	};

	return (
		<div className={`backdrop ${styles.pageParent}`}>
			<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }} className={styles.card}>
				<h1 className={styles.winMessage}>{winner} Wins!</h1>
				<Link className={styles.link} href="/lobby" onClick={handleEndGame}>
					Return to game lobby
				</Link>
			</motion.div>
		</div>
	);
};

export default EndModal;
