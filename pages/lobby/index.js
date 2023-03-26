"use client";
import React, { useEffect, useState, useRef, createContext } from "react";
import Messages from "@/components/Messages/Messages";
import {
  supabase,
  useStore,
  fetchAllMessages,
  fetchCurrentUser,
} from "@/lib/supabase";
import GameRoom from "@/components/GameRoom/GameRoom";
import { useUser } from "@supabase/auth-helpers-react";
import { useSelector } from "react-redux";
import Channels from "@/components/Channels/Channels";
import GlobalContext from "@/lib/GlobalContext";

const Lobby = () => {
  const authUser = useUser();
  const [user, setUser] = useState();
  const [conUser, setConUser] = useState(null);
  //const [conDeck, setConDeck] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", authUser.id)
        .single();
      setConUser(data);
      setUser(data);
    };
    fetchUser();
  }, []);

  return (
    <div>
      <GlobalContext.Provider value={{ conUser }}>
        <Messages props={user} />
        <Channels props={user} />
      </GlobalContext.Provider>
    </div>
  );
};

export default Lobby;
