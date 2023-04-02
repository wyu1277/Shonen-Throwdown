'use client';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { gameActions } from '@/store/slices/gameSlice';
import { loadActions } from '@/store/slices/loadSlice';

const Player2HP = (props) => {
	const dispatch = useDispatch();
	const health2 = useSelector((state) => {
		return state.game.player2HP;
	});

	useEffect(() => {
		health2 <= 0 && dispatch(gameActions.endGame(true));
		health2 <= 0 && dispatch(loadActions.setLoading(true));
	}, [health2]);

	return (
		<motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="player2-hp">
			{props?.opp} HP: {health2}
		</motion.div>
	);
};

export default Player2HP;
