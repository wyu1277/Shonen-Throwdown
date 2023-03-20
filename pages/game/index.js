import React from "react";
import supabase from "@/lib/supabase";

const Game = () => {
  supabase
    .channel("any")
    .on(
      "boardcast",
      { event: "*", schema: "public", table: "messages" },
      (payload) => {
        console.log("Change received!", payload);
      }
    )
    .subscribe();

  return (
    <div>
      <p>hi</p>
      <form>
        <div>
          <label htmlFor="content">Message</label>
          <textarea name="content" id="content"></textarea>
        </div>
      </form>
    </div>
  );
};

export default Game;
