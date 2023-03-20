import React from "react";
import { userRouter } from "next/router";
import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.nav}>
      <Link href="/">Home</Link>
      <Link href="/news">News and Updates</Link>
      <Link href="/about">About</Link>
      <Link href="/how-to-play">How to Play</Link>
      <Link href="/collection">Cards</Link>
      <Link href="/user">Account</Link>
      <Link href="/login">Login/Sign Up</Link>
      <Link href="/game">Game</Link>
    </div>
  );
};

export default Navbar;
