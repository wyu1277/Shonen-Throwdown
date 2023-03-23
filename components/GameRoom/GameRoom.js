import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "@/lib/supabase";
import { useUser } from "@supabase/auth-helpers-react";
import { useSelector } from "react-redux";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { UNSAFE_getPathContributingMatches } from "@remix-run/router";

const GameRoom = ({ props }) => {
  const [lobby, setLobby] = useState();
  const router = useRouter();
  const [player1, setPlayer1] = useState();
  const [player2, setPlayer2] = useState();

  useEffect(() => {
    const channel = supabase.channel("test", {
      config: { presence: { key: props.username } },
    });
    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        console.log("this is state", state);
      })
      .on("presence", { event: "join" }, async ({ key, newPresences }) => {
        await console.log(key, newPresences, "IS COMIN IN HOTTTTTTTTTTTTTTT");
        if (!lobby) {
          setLobby(key);
        }
        await setLobby((current) => [...current, key.new]);
        setLobby(key);
      })
      .on("presence", { event: "leave" }, ({ leftPresences }) => {
        console.log(leftPresences, "Has Left");
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          const status = await channel.track(props);
          console.log(status);
          await channel.untrack();
        }
      });
  }, []);

  const leaveHandler = () => {
    supabase.removeAllChannels();
    console.log("removed all channels");
    router.push("http://localhost:3000/");
  };

  return (
    <div>
      <h1>GameRoom</h1>
      <button onClick={leaveHandler}>Leave Room</button>
      <h3>Users In Lobby:{lobby}</h3>
    </div>
  );
};

export default GameRoom;
