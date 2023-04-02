'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import { gameActions } from '@/store/slices/gameSlice';
import { loadActions } from '@/store/slices/loadSlice';
import { supabase } from '@/lib/supabase';

const Player1HP = (props) => {
	const dispatch = useDispatch();
	// const router = useRouter;
	// const [health, setHealth] = useState(props.myHP);
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

	useEffect(() => {
		console.log('END GAME USE EFFECT BEFORE THE IF STATEMENT');
		if (ended) {
			console.log('THE GAME HAS ENDED INSIDE IF STATEMENT');
			const setEndState = () => {
				if (health1 > health2) {
					dispatch(gameActions.setWinner(player1.id));
				} else if (health2 > health1) {
					dispatch(gameActions.setWinner(player2.id));
				}
				setEndState();
				console.log('game winner', winner);
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
	}, [ended]);

	useEffect(() => {
		health1 <= 0 && dispatch(gameActions.endGame(true));
		health1 <= 0 && dispatch(loadActions.setLoading(true));
	}, [health1]);

	const checkstate = () => {
		console.log('ended state in player1hp', ended);
	};

	return (
		<motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="player1-hp">
			{props.user?.username} HP: {health1}
			<button onClick={checkstate}>check ended state</button>
		</motion.div>
	);
};

export default Player1HP;
