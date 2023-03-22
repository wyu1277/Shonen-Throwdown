import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "@/lib/supabase";

const GameRoom = () => {
  const router = useRouter();
  const [presence, setPresence] = useState();

  useEffect(() => {
    const channel = supabase.channel("test", {
      config: {
        presence: { user_id: 2 },
      },
    });
    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        setPresence(state);
        console.log("this is state", presence);
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
          });
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

  return (
    <div>
      GameRoom
      <button onClick={leaveHandler}>Leave Room</button>
    </div>
  );
};

export default GameRoom;
