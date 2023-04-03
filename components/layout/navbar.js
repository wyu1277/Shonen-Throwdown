import React from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useRouter } from "next/router";
import { useRef } from "react";

const Navbar = () => {
  const audioRef = useRef(null);
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const signOutHandler = async () => {
    await supabaseClient.auth.signOut();
    router.push("/login");
  };
  return (
    <div className={styles.nav}>
      <audio src="/audio/click.wav" ref={audioRef} />
      <Link
        className={styles.link}
        onClick={() => audioRef.current.play()}
        href="/"
      >
        Home
      </Link>
      <Link
        className={styles.link}
        onClick={() => audioRef.current.play()}
        href="/news"
      >
        News and Updates
      </Link>
      <Link
        className={styles.link}
        onClick={() => audioRef.current.play()}
        href="/about"
      >
        About
      </Link>
      <Link
        className={styles.link}
        onClick={() => audioRef.current.play()}
        href="/how-to-play"
      >
        How to Play
      </Link>
      <Link
        className={styles.link}
        onClick={() => audioRef.current.play()}
        href="/collection"
      >
        Cards
      </Link>
      {user && (
        <Link
          className={styles.link}
          onClick={() => audioRef.current.play()}
          href="/market"
        >
          Market
        </Link>
      )}
      {user && (
        <Link
          className={styles.link}
          onClick={() => audioRef.current.play()}
          href="/lobby"
        >
          Play!
        </Link>
      )}
      {!user && (
        <Link
          className={styles.link}
          onClick={() => audioRef.current.play()}
          href="/login"
        >
          Login/Sign Up
        </Link>
      )}
      {user && (
        <Link
          className={styles.link}
          onClick={() => audioRef.current.play()}
          href="/user"
        >
          Account
        </Link>
      )}
      {user && <button onClick={() => signOutHandler()}>Sign Out</button>}
    </div>
  );
};

export default Navbar;
