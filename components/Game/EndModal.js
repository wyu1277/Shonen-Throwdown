import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './EndModal.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { gameActions } from '@/store/slices/gameSlice';
import Router from 'next/router';
import { useUser } from '@supabase/auth-helpers-react';

import { supabase } from '@/lib/supabase';

let EndModal = () => {
	const winRef = useRef(null);
	const loseRef = useRef(null);
	const lose2Ref = useRef(null);
	const user = useUser();
	const dispatch = useDispatch();
	const winnerUsername = useSelector((state) => {
		return state.game.winnerUsername;
	});

	const player = useSelector((state) => {
		return state.game.player1;
	});

	const ended = useSelector((state) => {
		return state.game.ended;
	});

	const loser = useSelector((state) => {
		return state.game.loser;
	});

	useEffect(() => {
		console.log(loser, 'LOSER IN USE EFFECT');
		console.log(player, 'CONST PLAYER IN USEEFFECT');
		setTimeout(() => {
			if (loser !== null && player.id === loser.id) {
				lose2Ref.current.play();
			} else if (loser !== null && player.id !== loser.id) {
				winRef.current.play();
			}
		}, 1000);
	}, [loser]);

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
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ duration: 0.2 }}
				className={player.id === loser?.id ? styles.cardLose : styles.cardWin}
			>
				{player.id === loser?.id ? (
					<h1 className={styles.loseMessage}>You lost! You've been sent to the shadow realm!</h1>
				) : (
					<h1 className={styles.winMessage}>You win! You earned 3 tokens!</h1>
				)}
				<button className={styles.returnHome} onClick={handleEndGame}>
					Return Home
				</button>
			</motion.div>
			<audio src="/audio/gogo.mp3" ref={winRef} />
			<audio src="/audio/lost.mp3" ref={loseRef} />
			<audio src="/audio/lost2.mp3" ref={lose2Ref} />
		</div>
	);
};

export default EndModal;
