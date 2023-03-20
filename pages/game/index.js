import React from "react";
import supabase from "@/lib/supabase";

const Game = () => {
  const channel = supabase
    .channel("room1")
    .on("broadcast", { event: "cursor-pos" }, (payload) => {
      console.log("Cursor position received!", payload);
    })
    .subscribe((status) => {
      setInterval(() => {
        channel.send({
          type: "broadcast",
          event: "cursor-pos",
          payload: { x: Math.random(), y: Math.random() },
        });
        console.log(status);
      }, 100);
    });

  return <div>Game</div>;
};

export default Game;
