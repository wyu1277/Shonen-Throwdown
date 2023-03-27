"use client";
import React, { useEffect, useState } from "react";
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
  const [conUser, setConUser] = useState(null);
  //const [conDeck, setConDeck] = useState(null)

  console.log("this is props in game index 16", props);
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();
      setConUser(data);
    };
    fetchUser();
  }, []);

  console.log("pubic user", publicUser);
  console.log("props in game[]", props);
  console.log("user outside useE", conUser);

  return (
    <div>
      <GlobalContext.Provider value={publicUser}>
        <GameRoom props={publicUser} />
        <Messages props={publicUser} />
      </GlobalContext.Provider>
    </div>
  );
};

export default Game;
