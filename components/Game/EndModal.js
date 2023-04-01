import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './EndModal.module.css';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';

let EndModal = () => {
	const player1 = useSelector((state) => {
		return state.game.player1;
	});
	const player2 = useSelector((state) => {
		return state.game.player2;
	});

	const ended = useSelector((state) => {
		return state.game.ended;
	});

	const health1 = useSelector((state) => {
		return state.game.player1HP;
	});

	const health2 = useSelector((state) => {
		return state.game.playerHP;
	});

	const winner = useSelector((state) => {
		return state.game.winner;
	});

	if (ended) {
		console.log('THE GAME HAS ENDED');
		const setEndState = () => {
			if (health1 > health2) {
				dispatch(gameActions.setWinner(player1.id));
			} else if (health2 > health1) {
				dispatch(gameActions.setWinner(player2.id));
			}
			setEndState();
			console.log('game winner', winner);
			props.setEndModal(true);
			const updateGameHistory = async () => {
				if (health1 === health2) {
					try {
						await supabase.from('game').update({ isDraw: true }).eq('id', Router.query.id);
					} catch (error) {
						console.log('error in update game history', error);
					}
				} else {
					try {
						await supabase.from('game').update({ winner: winner }).eq('id', Router.query.id);
					} catch (error) {
						console.log('error in update game history', error);
					}
					const { data } = await supabase.from('users').select('wallet').eq('id', winner);
					console.log('winner wallet value', data);
					const walletUpdate = data + 3;
					const updateWallet = async () => {
						try {
							await supabase.from('users').update({ wallet: walletUpdate }).eq('id', winner);
						} catch (error) {
							console.log('error updating winner wallet', error);
						}
					};
					updateWallet();
				}
			};
			updateGameHistory();
		};
	}

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
