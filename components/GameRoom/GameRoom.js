import React, { useState } from "react";
import supabase from "@/lib/supabase";

const GameRoom = () => {
  const [presence, setPresence] = useState();
  const channel = supabase.channel("test", {
    config: {
      presence: { key: "" },
    },
  });

  channel
    .on("presence", { event: "sync" }, () => {
      const state = channel.presenceState();
      setPresence(state);
      console.log("this is state", state);
    })
    .on("presence", { event: "join" }, ({ newPresences }) => {
      console.log(newPresences, "Has Joined");
    })
    .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
      console.log(leftPresences, "has left");
    })
    .subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        const presenceTrackStatus = await channel.track({
          user_id: 2,
          online_at: new Date().toISOString(),
        });
        console.log(presenceTrackStatus);
      }
    });

  return <div>GameRoom</div>;
};

export default GameRoom;
