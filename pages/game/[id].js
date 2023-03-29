"use client";
import React, { useEffect, useState, useContext } from "react";
import Messages from "@/components/Messages/Messages";
import { supabase } from "@/lib/supabase";
import GameRoom from "@/components/GameRoom/GameRoom";
import { useUser } from "@supabase/auth-helpers-react";
import { useSelector } from "react-redux";
import Channels from "@/components/Channels/Channels";
import { GlobalContext } from "@/lib/GlobalContext";
import GameComponent from "@/components/Game/GameComponent";
import Loading from "@/components/Game/Loading";
import { useRouter } from "next/router";

const Game = (props) => {
  const user = useUser();
  const publicUser = useSelector((state) => state.user.user);
  const [conUser, setConUser] = useState(null);
  //const [conDeck, setConDeck] = useState(null)
  const loading = useSelector((state) => {
    return state.load;
  });

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const { data } = await supabase
  //       .from("users")
  //       .select("*")
  //       .eq("id", user.id)
  //       .single();
  //     setConUser(data);
  //   };
  //   fetchUser();
  // }, []);
  const router = useRouter();
  const channel = router.query;

  console.log("this is channel", channel);

  return (
    <div>
      <GlobalContext.Provider value={publicUser}>
        {/* <GameRoom props={publicUser} /> */}
        {loading && <Loading />}
        {!loading && <GameComponent />}

        <Messages props={publicUser} />
      </GlobalContext.Provider>
    </div>
  );
};

export default Game;
