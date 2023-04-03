import React, { useState } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useRouter } from "next/router";
import { useRef } from "react";

const Navbar = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const signOutHandler = async () => {
    await supabaseClient.auth.signOut();
    router.push("/login");
    setShowDropdown(!showDropdown);
  };
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div className={styles.nav}>
      <div className={styles.linkContainer}>
        <Link className={styles.logoContainer} href="/">
          <img className={styles.logo} src="https://i.imgur.com/igGs067.png" />
        </Link>
        <Link className={styles.link} href="/news">
          NEWS AND UPDATE
        </Link>
        <Link className={styles.link} href="/about">
          ABOUT
        </Link>
        <Link className={styles.link} href="/how-to-play">
          HOW TO PLAY
        </Link>
        <Link className={styles.link} href="/collection">
          CARDS
        </Link>
        {user && (
          <Link className={styles.link} href="/market">
            MARKET
          </Link>
        )}
        {user && (
          <Link className={styles.link} href="/lobby">
            PLAY!
          </Link>
        )}
        {!user && (
          <Link className={styles.link} href="/login">
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
            <Link className={styles.dropDownLink} href="/user">
              MY ACCOUNT
            </Link>
          )}
          {user && <button onClick={() => signOutHandler()}>Sign Out</button>}
        </div>
      )}
    </div>
  );
};

export default Navbar;
