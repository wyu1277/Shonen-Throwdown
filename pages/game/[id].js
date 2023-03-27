"use client";
import React, { useEffect, useState, useContext } from "react";
import Messages from "@/components/Messages/Messages";
import { supabase } from "@/lib/supabase";
import GameRoom from "@/components/GameRoom/GameRoom";
import { useUser } from "@supabase/auth-helpers-react";
import { useSelector } from "react-redux";
import Channels from "@/components/Channels/Channels";
import { GlobalContext } from "@/lib/GlobalContext";

const Game = (props) => {
  const user = useUser();
  const publicUser = useSelector((state) => state.user.user);
  //const [conDeck, setConDeck] = useState(null)
  const conUser = useContext(GlobalContext);
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

  return (
    <div>
      <GlobalContext.Provider value={conUser}>
        <GameRoom props={{ publicUser, conUser }} />
        <Messages props={publicUser} />
      </GlobalContext.Provider>
    </div>
  );
};

export default Game;
