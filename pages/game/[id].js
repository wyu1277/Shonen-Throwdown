"use client";
import React, { useEffect, useState, useContext } from "react";
import Messages from "@/components/Messages/Messages";
import { supabase } from "@/lib/supabase";
import GameRoom from "@/components/GameRoom/GameRoom";
import { useUser } from "@supabase/auth-helpers-react";
import { useSelector } from "react-redux";
import Channels from "@/components/Channels/Channels";
import { useRouter } from "next/router";

const Game = (props) => {
  const user = useUser();
  const publicUser = useSelector((state) => state.user.user);

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
      <GameRoom props={publicUser} />
      <Messages props={publicUser} />
    </div>
  );
};

export default Game;
