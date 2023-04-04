"use client";
import { supabase } from "@/lib/supabase";
import {
  createBrowserSupabaseClient,
  SupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, useUser } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import "@/styles/globals.css";
import Navbar from "../components/layout/navbar";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "@/store";
import { AnimatePresence } from "framer-motion";
import { setUseProxies } from "immer";
import Router from "next/router";
import { Roboto, Noto_Serif } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps, router }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const showHeader = router.pathname === "/game/[id]" ? false : true;
  return (
    <Provider store={store}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        {showHeader && <Navbar />}
        <AnimatePresence node="wait">
          <main className={roboto.className}>
            <Component key={router.route} {...pageProps} />
          </main>
        </AnimatePresence>
      </SessionContextProvider>
    </Provider>
  );
}
