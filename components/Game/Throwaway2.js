import React from 'react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { gameLobbyActions } from '@/store/slices/gameLobbySlice';

const Throwaway2 = () => {
	const dispatch = useDispatch();
	const [presence, setPresence] = useState([]);
	const [lobby, setLobby] = useState(null);

	const player = useSelector((state) => {
		return state.user.user;
	});

	const channel = supabase.channel(Router.query.id, {
		config: { presence: { key: player.username } }
	});

	useEffect(() => {
		channel
			.on('presence', { event: 'sync' }, () => {
				const state = channel.presenceState();
				setPresence(state);
				setLobby(getLobby(state));
				console.log('this is state', state);
			})
			.on('presence', { event: 'join' }, ({ key, newPresences }) => {
				let newPresence = newPresences[0];
				console.log(key, newPresence, 'IS COMIN IN HOTTTTTTTTTTTTTTT');
			})
			.subscribe(async (status) => {
				console.log(status, 'STATUS');
				if (status === 'SUBSCRIBED') {
					await channel.track({ key: player.username });
				}
			});
	}, []);

	const getLobby = (presence) => {
		return Object.values(presence).map((userPresences) => userPresences[0].key);
	};

	useEffect(() => {
		if (presence && Object.values(presence).length > 0) {
			setLobby(getLobby(presence));
		}
	}, [presence]);

	dispatch(gameLobbyActions.setPlayers(lobby));

	return (
		<div>
			<h1>Users In Lobby: {lobby ? lobby.map((user) => <div>{user}</div>) : 'loading'}</h1>
		</div>
	);
};

export default Throwaway2;
