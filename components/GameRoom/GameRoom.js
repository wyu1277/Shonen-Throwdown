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
      console.log("this is state");
    })
    .on("presence", { event: "join" }, ({ newPresences }) => {
      console.log(newPresences[0].user_id, "Has Joined");
    })
    .on("presence", { event: "leave" }, ({ leftPresences }) => {
      console.log(leftPresences, "has left");
    })
    .subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        const presenceTrackStatus = await channel.track({
          user_id: 2,
          online_at: new Date().toISOString(),
        });
        console.log("this is track", presenceTrackStatus);
      }
    });

  const leaveHandler = () => {
    supabase.removeAllChannels();
    console.log("removed all channels");
  };

  return (
    <div>
      GameRoom
      <button onClick={leaveHandler}>Leave Room</button>
    </div>
  );
};

export default GameRoom;
