import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './EndModal.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { gameActions } from '@/store/slices/gameSlice';
import Router from 'next/router';

import { supabase } from '@/lib/supabase';

let EndModal = () => {
	const dispatch = useDispatch();
	const winnerUsername = useSelector((state) => {
		return state.game.winnerUsername;
	});

	const ended = useSelector((state) => {
		return state.game.ended;
	});

	const handleEndGame = (e) => {
		e.preventDefault();
		dispatch(gameActions.endGame(false));
		dispatch(gameActions.setPlayer1hp(15));
		dispatch(gameActions.setPlayer2hp(15));
		dispatch(gameActions.setPlayer1({}));
		dispatch(gameActions.setPlayer2({}));
		dispatch(gameActions.setPlayer1Deck([]));
		dispatch(gameActions.setPlayer2Deck([]));
		dispatch(gameActions.setCounter(0));
		dispatch(gameActions.setWinner(null));
		dispatch(gameActions.setCardToPlay(false));
		dispatch(gameActions.setShouldReload(true));
		dispatch(gameActions.setWinnerUsername(null));
		supabase.removeAllChannels();
		Router.push('/');
	};

	const checkstate = () => {
		console.log('state in end screen page', ended);

	};

	return (
		<div className={`backdrop ${styles.pageParent}`}>
			<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }} className={styles.card}>
				<h1 className={styles.winMessage}>{winnerUsername} Wins!</h1>
				<button className={styles.link} onClick={handleEndGame}>
					Return to game lobby
				</button>
			</motion.div>
		</div>
	);
};

export default EndModal;
