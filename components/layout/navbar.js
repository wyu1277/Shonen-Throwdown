import React, { useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { useRouter } from 'next/router';
import { useRef } from 'react';

const Navbar = () => {
	const audioRef = useRef(null);
	const router = useRouter();
	const supabaseClient = useSupabaseClient();
	const user = useUser();
	const signOutHandler = async () => {
		await supabaseClient.auth.signOut();
		router.push('/login');
		setShowDropdown(!showDropdown);
	};
	const [showDropdown, setShowDropdown] = useState(false);
	const toggleDropdown = () => {
		setShowDropdown(!showDropdown);
		audioRef.current.play();
	};
	return (
		<div className={styles.nav}>
			<audio src="/audio/click.wav" ref={audioRef} />
			<Link className={styles.logoContainer} onClick={() => audioRef.current.play()} href="/">
				<img className={styles.logo} src="https://i.imgur.com/igGs067.png" />
			</Link>
			<div className={styles.linkContainer}>
				<Link className={styles.link} onClick={() => audioRef.current.play()} href="/news">
					NEWS AND UPDATES
				</Link>
				<Link className={styles.link} onClick={() => audioRef.current.play()} href="/about">
					ABOUT
				</Link>
				<Link className={styles.link} onClick={() => audioRef.current.play()} href="/how-to-play">
					HOW TO PLAY
				</Link>
				<Link className={styles.link} onClick={() => audioRef.current.play()} href="/collection">
					CARDS
				</Link>
				{user && (
					<Link className={styles.link} onClick={() => audioRef.current.play()} href="/market">
						MARKET
					</Link>
				)}
				{user && (
					<Link className={styles.link} onClick={() => audioRef.current.play()} href="/lobby">
						PLAY!
					</Link>
				)}
				{!user && (
					<Link className={styles.link} onClick={() => audioRef.current.play()} href="/login">
						LOGIN/SIGNUP
					</Link>
				)}
			</div>
			{user && (
				<div className={styles.dropDownWrapper} onClick={toggleDropdown}>
					SETTINGS
				</div>
			)}
			{showDropdown && (
				<div className={styles.dropDown}>
					{user && (
						<Link className={styles.dropDownLink} onClick={() => audioRef.current.play()} href="/user">
							MY ACCOUNT
						</Link>
					)}
					{user && (
						<button className={styles.signout} onClick={() => signOutHandler()}>
							Sign Out
						</button>
					)}
				</div>
			)}
		</div>
	);
};

export default Navbar;
