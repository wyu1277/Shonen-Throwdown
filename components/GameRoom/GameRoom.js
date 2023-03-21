import React, { useState } from "react";
import supabase from "@/lib/supabase";

const GameRoom = () => {
  const [presence, setPresence] = useState();
  const channel = supabase.channel("test");

  channel
    .on("presence", { event: "sync" }, () => {
      const state = channel.presenceState();
      setPresence(state);
      console.log(state);
    })

    .subscribe();

  return <div>GameRoom</div>;
};

export default GameRoom;
