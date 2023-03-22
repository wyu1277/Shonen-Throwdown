import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "@/lib/supabase";
import { useUser } from "@supabase/auth-helpers-react";
import { useSelector } from "react-redux";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";

const GameRoom = () => {
  const user = useUser();
  const router = useRouter();
  const [presence, setPresence] = useState();
  const [player1, setPlayer1] = useState();
  const [player2, setPlayer2] = useState();
  const [username, setUsername] = useState();

  console.log(
    "this is user ####################### in gameroommmmmmmmm",
    username
  );

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();
      setUsername(data);
    };
    getUser();
  }, []);

  useEffect(() => {
    const channel = supabase.channel("test", {
      config: {
        presence: { user: "" },
      },
    });
    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        setPresence(state);
      })
      .on("presence", { event: "join" }, ({ newPresences }) => {
        console.log(newPresences, "Has Joined");
      })
      .on("presence", { event: "leave" }, ({ leftPresences }) => {
        console.log(leftPresences, "has left");
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          const status = await channel.track({
            online_at: new Date().toISOString(),
            user_id: user.id,
          });
          await channel.untrack();
          console.log("this is track", status);
        }
      });
  }, []);

  const leaveHandler = () => {
    supabase.removeAllChannels();
    console.log("removed all channels");
    console.log("this is to track presence status", presence);
    router.push("http://localhost:3000/");
  };

  console.log("this is state", presence);

  return (
    <div>
      <h1>GameRoom</h1>
      <button onClick={leaveHandler}>Leave Room</button>
      <h3>Users In Chat:</h3>
    </div>
  );
};

export default GameRoom;
