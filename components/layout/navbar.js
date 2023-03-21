import React from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const signOutHandler = async () => {
    await supabaseClient.auth.signOut();
    router.push("/login");
  };
  console.log(user, "NAV_USER");
  return (
    <div className={styles.nav}>
      <Link href="/">Home</Link>
      <Link href="/news">News and Updates</Link>
      <Link href="/about">About</Link>
      <Link href="/how-to-play">How to Play</Link>
      <Link href="/collection">Cards</Link>
      {!user && <Link href="/login">Login/Sign Up</Link>}

      {user && <Link href="/user">Account</Link>}
      {user && <button onClick={() => signOutHandler()}>Sign Out</button>}
    </div>
  );
};

export default Navbar;
